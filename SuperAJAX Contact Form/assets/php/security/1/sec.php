<?php

/* Captcha
 *
 * Gera imagem do código
 *
 * 2007 Aldeia Numaboa
 * @author: Viktoria Tkotz, contato arroba numaboa.com.br
 *
 */

// Gerar números do código
$seccode = mt_rand(10000, 99999);
session_start();
$_SESSION['seccode'] = $seccode;
// Se quiser, o texto também pode conter letras
/* $chars = "AB1CD2EF3GH4IJ5KL6MN7P8QR9STUVWXYZ";
$seccode = "";
for($i = 0; $i < 5; $i++)  // $i < Número de caracteres
  $seccode .= $chars[mt_rand(0, 33)];
*/

// Criar imagem
header("Content-Type: image/png");
$im = imagecreate(60, 18) or die('Error on create image!');
// imagecreate(LARG, ALTURA)
$corfundo = imagecolorallocate($im, 255, 244, 234);
// imagecolorallocate($im, R, G, B) Só mudar R,G,B!
$corfonte = imagecolorallocate($im, 255, 128, 0);
// imagecolorallocate($im, R, G, B) R,G,B!
$corlinha = imagecolorallocate($im, 255, 200, 150);
// imagecolorallocate($im, R, G, B) R,G,B!
$corborda = imagecolorallocate($im, 255, 128, 0);
// imagecolorallocate($im, R, G, B) R,G,B!

// Linhas verticais
for($x=10; $x <= 100; $x+=10)
    imageline($im, $x, 0, $x, 50, $corlinha);

// Linha central
imageline($im, 0, 9, 100, 9, $corlinha);

// Borda
imageline($im, 0, 0, 0, 50, $corborda);
imageline($im, 0, 0, 100, 0, $corborda);
imageline($im, 0, 17, 100, 17, $corborda);
imageline($im, 59, 0, 59, 17, $corborda);

imagestring($im, 5, 8, 1, $seccode, $corfonte);
imagepng($im);
imagedestroy($im);

?>
