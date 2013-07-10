<?php

/**
 * Note: running this file builds Hilo for distribution
 * @author Erik Royall <erikroyall@hotmail.com>
 */

$ver = '0.1.0-pre-dev-beta-4';

$zip = new ZipArchive();

$res = $zip->open("hilo-$ver.zip", ZipArchive::CREATE);

if ($res === true) {
  echo "ok\r";
  $zip->addFile('hilo.js', file_get_contents('hilo-dev.js'));
  $zip->addFile('hilo.min.js', file_get_contents('hilo-dev.min.js'));
  $zip->addFile('README.md', file_get_contents('U:/js/hilo/README.md'));
  $zip->addFile('LICENSE-MIT', file_get_contents('U:/js/hilo/LICENSE-MIT'));
  $zip->close();
  echo "success\r";
  echo "download: <a href='build/hilo-$ver.zip'>hilo-$ver.zip</a>";
} else {
  echo 'failed';
}
