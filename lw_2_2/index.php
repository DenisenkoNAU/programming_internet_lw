<?php
$max = $_POST['max'] ?? 10;
$sign = $_POST['sign'] ?? '+';
$op1 = $_POST['op1'] ?? '';
$op2 = $_POST['op2'] ?? '';
$input = $_POST['input'] ?? '';
$message = "???";

if (isset($_POST['digit'])) {
  $input .= $_POST['digit'];
}

if (isset($_POST['ok'])) {
  $userResult = (int)$input;
  $correct = match ($sign) {
    '+' => $op1 + $op2,
    '-' => $op1 - $op2,
    '*' => $op1 * $op2,
  };
  $message = ($userResult === $correct) ? "Вірно!" : "Спробуй ще!";
  $input = '';
}

if (isset($_POST['generate'])) {
  $op1 = rand(0, $max);
  switch ($sign) {
    case '+':
      $op2 = rand(0, $max - $op1);
      break;
    case '-':
      $op2 = rand(0, $op1);
      break;
    case '*':
      $op2 = $op1 === 0 ? 0 : rand(0, (int)($max / $op1));
      break;
  }
}
?>

<!DOCTYPE html>
<html lang="uk">

<head>
  <meta charset="UTF-8">
  <title>Математичний тест з калькулятором</title>
  <link rel="stylesheet" href="./css/index.css" />
</head>

<body>
  <h1 class="center">Математичний тест</h1>

  <hr>

  <form method="POST" class="center">
    <input type="hidden" name="op1" value="<?= $op1 ?>">
    <input type="hidden" name="op2" value="<?= $op2 ?>">
    <input type="hidden" name="sign" value="<?= $sign ?>">
    <input type="hidden" name="max" value="<?= $max ?>">
    <input type="hidden" name="input" value="<?= $input ?>">

    <table class="center">
      <tr>
        <td><button class="value-button" name="max" value="10">0-10</button></td>
        <td><button class="value-button" name="max" value="20">0-20</button></td>
        <td><button class="value-button" name="max" value="25">0-25</button></td>
        <td><button class="value-button" name="max" value="100">0-100</button></td>
        <td><button class="sign-button" name="sign" value="+">+</button></td>
        <td><button class="sign-button" name="sign" value="-">-</button></td>
        <td><button class="sign-button" name="sign" value="*">*</button></td>
      </tr>
    </table>

    <hr>

    <table class="center">
      <tr>
        <td><input type="text" value="<?= $op1 ?>" disabled size="3"></td>
        <td><input type="text" value="<?= $sign ?>" disabled size="1"></td>
        <td><input type="text" value="<?= $op2 ?>" disabled size="3"></td>
        <td>=</td>
        <td><input type="text" value="<?= $input ?>" disabled size="4"></td>
        <td><button name="generate">?</button></td>
        <td><input type="text" value="<?= $message ?>" disabled></td>
      </tr>
    </table>

    <hr />

    <table class="center" id="keyboard">
      <?php for ($i = 1; $i <= 9; $i++): ?>
        <?php if ($i % 3 === 1): ?><tr><?php endif; ?>
          <td>
            <button
                class="calc-button"
                id="b<?= $i ?>"
                name="digit"
                value="<?= $i ?>"
            ><?= $i ?></button>
          </td>
        <?php if ($i % 3 === 0): ?></tr><?php endif; ?>
      <?php endfor; ?>
      <tr>
        <td><button class="calc-button" id="b0" name="digit" value="0">0</button></td>
        <td colspan="2"><button id="bs" class="calc-button" name="ok">OK</button></td>
      </tr>
    </table>
  </form>

  <hr>

</body>

</html>
