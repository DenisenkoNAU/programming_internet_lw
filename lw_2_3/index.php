<?php
$errors = [];
$userData = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $userData = [
    'користувач' => trim($_POST['username'] ?? ''),
    'імʼя' => trim($_POST['first_name'] ?? ''),
    'прізвище' => trim($_POST['last_name'] ?? ''),
    'email' => trim($_POST['email'] ?? ''),
    'пароль' => trim($_POST['password'] ?? ''),
    'адреса' => trim($_POST['address'] ?? ''),
    'телефон' => trim($_POST['phone'] ?? ''),
  ];

  // Перевірка на порожні поля
  foreach ($userData as $key => $value) {
    if ($value === '') {
      $errors[] = "Поле \"$key\" є обов'язковим.";
    }
  }

  // Перевірка email
  if (!filter_var($userData['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Невірний формат e-mail.";
  }

  // Якщо немає помилок — показуємо масив
  if (empty($errors)) {
    echo "<h3>Реєстрація успішна. Дані користувача:</h3>";
    echo "<pre>";
    print_r($userData);
    echo "</pre>";
  }
}
?>

<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Форма реєстрації</title>
  <link rel="stylesheet" href="./css/index.css">
</head>
<body>
  <h2>Форма реєстрації</h2>

  <?php if (!empty($errors)): ?>
    <div class="error">
      <ul>
        <?php foreach ($errors as $error): ?>
          <li><?= htmlspecialchars($error) ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  <?php endif; ?>

  <div class="form-card">
        
  <form method="POST">
    <label>Імʼя користувача:
      <input type="text" name="username" value="<?= htmlspecialchars($userData['користувач'] ?? '') ?>">
    </label>

    <label>Імʼя:
      <input type="text" name="first_name" value="<?= htmlspecialchars($userData['імʼя'] ?? '') ?>">
    </label>

    <label>Прізвище:
      <input type="text" name="last_name" value="<?= htmlspecialchars($userData['прізвище'] ?? '') ?>">
    </label>

    <label>E-mail:
      <input type="email" name="email" value="<?= htmlspecialchars($userData['email'] ?? '') ?>">
    </label>

    <label>Пароль:
      <input type="password" name="password">
    </label>

    <label>Адреса:
      <input type="text" name="address" value="<?= htmlspecialchars($userData['адреса'] ?? '') ?>">
    </label>

    <label>Телефон:
      <input type="text" name="phone" value="<?= htmlspecialchars($userData['телефон'] ?? '') ?>">
    </label>

    <br><br>
    <button type="submit">Зареєструватись</button>
  </form>
  </div>
</body>
</html>
