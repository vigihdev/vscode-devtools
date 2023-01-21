<?php

namespace yii2Reflection;

use ReflectionParameter;

class ReflectionParameters extends ReflectionParameter
{

	public $isOptional;

	public $defaultValue;
	
	public static function from(array $param):array
	{
		$result = [];
		if (is_array($param) && !empty($param)) {
			foreach ($param as $i => $parameter) {
				if ($parameter instanceof ReflectionParameter) {

					$paramName = $parameter->name;
					$methodName = $parameter->getDeclaringFunction()->name;
					$className = $parameter->getDeclaringClass()->name;

					$model = new self(array($className, $methodName), $paramName);
					$model->isOptional = $model->isOptional();
					$model->defaultValue = $model->isOptional() ? $model->getDefaultValue() : null;
					$result[] = $model;
				}
			}
		}
		return $result;
	}

}
