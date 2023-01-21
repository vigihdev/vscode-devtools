#!/usr/bin/env php
<?php


namespace Composer;

$GLOBALS['_composer_bin_dir'] = __DIR__;
$GLOBALS['_composer_autoload_path'] = __DIR__ . '/..'.'/autoload.php';

$fileLoader = [
	__DIR__ . '/..' . '/autoload.php' 
];

foreach ($fileLoader as $file) {
	if(file_exists($file)){
		require_once $file;
	}
}
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
echo "Bin Server Run\n" ;

function testFuncOnServer(){
	return 'testFuncOnServer';
}