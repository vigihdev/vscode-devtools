<?php

namespace yii2Reflection;

use \ReflectionClass;
use ReflectionMethod;

class ReflectionClasss extends ReflectionClass
{

	public static function from(string $className): self
	{
		if (class_exists($className)) {
			$self = new self($className);
			return $self;
		}
		return null;
	}

	public function __construct(string $className)
	{
		parent::__construct($className);
	}

	public function initialize()
	{
		foreach ($this->getMethods(ReflectionMethod::IS_PUBLIC) as $i => $method) {
			$methodName = $method->name;
			$className = $method->class;
			$fileName = $method->getFileName();
			$startLine = $method->getStartLine();
			$endLine = $method->getEndLine();
			$decClass = $method->getDeclaringClass();
			$length = $endLine - $startLine;

			if ($method->isStatic()) {
			} else {

				if (ReflectionRelationMethods::hasMethodRelation($methodName)) {
					new ReflectionRelationMethods($className,$methodName);
					$source = file($fileName);
					$body = implode("", array_slice($source, $startLine, $length));

					preg_match(ReflectionRelationMethods::PATERN_RELATION_METHODS,$body,$maches);


					// echo "<pre>";
					// var_dump($maches);
					// echo "</pre>";
				}
				echo "<pre>";
				// var_dump($method->getReturnType());
				// var_dump($method->__toString());
				// var_dump($method->getNamespaceName());
				echo "</pre>";
			}
		}
		// $methods = $this->getMethods();

		echo "<pre>";
		// var_dump($methods);
		echo "</pre>";
	}



	public function getMethodsss($filter = null): array
	{

		$methods = parent::getMethods($filter);
		$results = array();

		foreach ($methods as $method) {
			if (($method->getModifiers() & $filter) === $filter) {
				$methodName = $method->name;
				$className = $method->class;
				$decClass = $method->getDeclaringClass();

				$public = $decClass->getProperties(\ReflectionProperty::IS_PUBLIC);
				$static = $decClass->getProperties(\ReflectionProperty::IS_STATIC);
				$refMethods = new ReflectionMethods($className, $methodName);
				$staticmethods = $decClass->getMethods(ReflectionMethod::IS_STATIC);

				$results[] = [
					'name' => $methodName,
					'class' => $className,
					'type' => $method->isStatic(),
					'file' => $method->getFileName(),
					'paramm' => ReflectionParameters::from($method->getParameters())
				];
			}
		}
		return $results;
	}
}
