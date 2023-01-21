<?php

use yii2Reflection\ReflectionClasss;
use composerDev\Composer;

$serverName = 'Yii2 Server';
// /Users/thrubus/Sites/dev/basic/yii2-app-basic/vendor/composer/autoload_psr4.php
// /Users/thrubus/Sites/dev/basic/yii2-app-basic/vendor/composer/autoload_static.php
$composerPsr4 = '/Users/thrubus/Sites/thrubus/member/vendor/composer/autoload_psr4.php';
$composerStatic = '/Users/thrubus/Sites/thrubus/member/vendor/composer/autoload_static.php';

$vendorAutoload = '/Users/thrubus/Sites/thrubus/member/vendor/autoload.php';
$Yii = '/Users/thrubus/Sites/thrubus/member/vendor/yiisoft/yii2/Yii.php';

$psr4 = include $composerPsr4;
$b = include $composerPsr4;

$fileLoader = [
	__DIR__ . '/..' . '/autoload.php',
	'/Users/thrubus/vscode/Extension/vscode-devtools/vendor/composer-dev/vendor/autoload.php',
	$vendorAutoload,
	$Yii,
	'/Users/thrubus/Sites/thrubus/member/vendor/libsoft/composer/autoload_real.php'
];

// $cwd = getcwd();
// $dumpComp = include '/Users/thrubus/vscode/Extension/vscode-devtools/vendor/composer-dev/composer.json';
// $dump = exec('cd /Users/thrubus/vscode/Extension/vscode-devtools/vendor/composer-dev && composer dump-autoload');
// echo "<pre>";
// 	var_dump($dump);
// echo "</pre>";

foreach ($fileLoader as $file) {
	if(file_exists($file)){
		require_once $file;
	}
}

// Composer::dump();


// === Reflection EXample
$fileName = 'html.json';
$basePath = '/Users/thrubus/vscode/Extension/vscode-devtools/vendor/test/src';

// $reflection = Reflections::from('yii\\helpers\Html');
$reflection = ReflectionClasss::from('app\\models\base\Orders');
$reflection->initialize();

// $data = json_encode($reflection->getMethods());
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
echo "Bin {$serverName} Run\n";
// file_put_contents($basePath . DIRECTORY_SEPARATOR . $fileName,$data);

// echo "<pre>";
// 	var_dump(class_exists('yii2Reflection\\App'));
// echo "</pre>";
?>