<?php  

$fileLoader = [
	__DIR__ . '/..' . '/autoload.php',
	'/Users/thrubus/Sites/dev/basic/yii2-app-basic/vendor/autoload.php',
	'/Users/thrubus/Sites/dev/basic/yii2-app-basic/vendor/yiisoft/yii2/Yii.php',
];

foreach ($fileLoader as $file) {
	if(file_exists($file)){
		require_once $file;
	}
}
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
echo "Bin Yii2 Server Run\n" ;

$reflection = new ReflectionClass('yii\\helpers\\ArrayHelper');

function rama(){
	return 'rama';
}

function sava(){
	$reflection = new ReflectionClass('yii\\helpers\\ArrayHelper');
	return json_encode($reflection->getMethods(),JSON_PRETTY_PRINT);
}


function query(){
	$reflection = new ReflectionClass('yii\\db\\Query');
	file_put_contents('/Users/thrubus/vscode/Extension/vscode-devtools/vendor/test/src/yii-db-query.json',
	json_encode($reflection->getMethods(),JSON_PRETTY_PRINT)
);
	return json_encode($reflection->getMethods(),JSON_PRETTY_PRINT);
}


?>