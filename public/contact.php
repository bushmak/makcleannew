<?php

header('Content-Type: application/json; charset=utf-8');

// Autoriser uniquement POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Méthode non autorisée.']);
  exit;
}

// Récupération du corps JSON
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['error' => 'Données invalides.']);
  exit;
}

$name          = trim($data['name'] ?? '');
$email         = trim($data['email'] ?? '');
$phone         = trim($data['phone'] ?? '');
$commune       = trim($data['commune'] ?? '');
$communeOther  = trim($data['communeOther'] ?? '');
$addressDetail = trim($data['addressDetail'] ?? '');
$location      = trim($data['location'] ?? '');
$service       = trim($data['service'] ?? '');
$message       = trim($data['message'] ?? '');

$honeypot     = trim($data['honeypot'] ?? '');
$humanConfirm = !empty($data['humanConfirm']);
$submittedAt  = $data['submittedAt'] ?? 0;

// Honeypot
if ($honeypot !== '') {
  echo json_encode(['success' => true]);
  exit;
}

// Soumission trop rapide (bots automatisés)
if (time() * 1000 - (int)$submittedAt < 2000) {
  http_response_code(400);
  echo json_encode(['error' => 'Merci de vérifier votre message avant d\'envoyer.']);
  exit;
}

if (!$humanConfirm) {
  http_response_code(400);
  echo json_encode(['error' => 'Merci de confirmer l\'envoi du formulaire.']);
  exit;
}

// Validation basique
if ($name === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Merci de remplir les champs obligatoires.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Email invalide.']);
  exit;
}

if ($commune === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Merci d\'indiquer la commune ou la localité du chantier.']);
  exit;
}

if ($commune === 'autre' && $communeOther === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Merci de préciser le nom de votre commune.']);
  exit;
}

if ($location === '') {
  if ($commune === 'autre') {
    $location = $communeOther;
  } elseif ($commune === 'hors-zone') {
    $location = 'Hors zone / à confirmer';
  } else {
    $location = $commune;
  }
}

$to      = 'info@makclean.be';
$subject = 'Nouveau devis — ' . $location . ' — ' . ($service !== '' ? $service : 'Service non précisé') . ' — ' . $name;

$body  = "Nom : {$name}\n";
$body .= "Email : {$email}\n";
$body .= "Téléphone : " . ($phone !== '' ? $phone : 'Non renseigné') . "\n";
$body .= "Commune / localité : {$location}\n";
if ($addressDetail !== '') {
  $body .= "Adresse ou précision : {$addressDetail}\n";
}
$body .= "Service : " . ($service !== '' ? $service : 'Non précisé') . "\n\n";
$body .= "Message :\n{$message}\n";

$headers   = [];
$headers[] = 'From: Makclean <info@makclean.be>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=utf-8';

if (!function_exists('mail')) {
  http_response_code(500);
  echo json_encode(['error' => 'L\'envoi d\'emails est désactivé sur votre hébergement (fonction mail()). Contactez Hostinger pour l\'activer.']);
  exit;
}

$additional_params = '-finfo@makclean.be';
$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), $additional_params);

if (!$sent) {
  http_response_code(500);
  echo json_encode(['error' => 'Erreur lors de l\'envoi de l\'email (serveur mail).']);
  exit;
}

echo json_encode(['success' => true]);
exit;

