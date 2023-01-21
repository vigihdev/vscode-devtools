<?php

namespace composerDev;

class Composer 
{
	const PACKAGE_NAME = 'thrubus/composer-dev';
	const FILE_NAME = 'composer.json';

	public static function dump()
	{
		self::updateComposerJson();
		// $data = json_decode(file_get_contents(__DIR__ . '/..' . '/composer.json'));
		// echo "<pre>";
		// 	var_dump($data->autoload);
		// 	var_dump(self::fileInfo());
		// 	var_dump(exec('pwd'));
		// echo "</pre>";
	}

	public static function check(){

	}

	public static function valid()
	{
		$file = __DIR__ . '/..' . 'composer.json';
		return file_exists($file);
	}

	private static function fileInfo():array
	{
		$file = __DIR__ . '/..' . '/composer.json';
		return file_exists($file) ? pathinfo($file) : [];
	}

	public static function delete(){

	}

	private static function updateComposerJson():bool
	{
		$composer = __DIR__ . '/..' . '/' . self::FILE_NAME;
		if( file_exists($composer) ){
			$data = json_decode(file_get_contents($composer));
			if( is_object($data) ){
				if( property_exists($data,'autoload') && property_exists($data,'name') && $data->name === self::PACKAGE_NAME ){
					$psr4 = (array)$data->autoload->{'psr-4'};

					$data->autoload = array_merge($psr4,['app\\' => 'bawuk']);
					var_dump(json_encode($data));
					return true;
				}
			}
		}
		return false;
	}

	private static function createComposerJson(array $psr4)
	{
		// object(stdClass)#2 (7) {

	}
}
