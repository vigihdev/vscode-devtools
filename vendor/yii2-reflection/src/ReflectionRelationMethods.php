<?php

namespace yii2Reflection;


class ReflectionRelationMethods extends \ReflectionMethod
{

    const PATERN_RELATION_METHODS = '/\$this->hasOne\(.*?::|\$this->hasMany\(.*?::/i';
    const PATERN_USE = '/use\s.*?;/i';
    const PATERN_EXTENDS = '/class\sextends.*/i';

    public static function hasMethodRelation(string $methodName): bool
    {
        return substr($methodName, -1) === 's';
    }

    public function __construct(string $className, string $methodName)
    {
        parent::__construct($className, $methodName);
        $startLine = $this->getStartLine();
        $endLine = $this->getEndLine();
        $decClass = $this->getDeclaringClass();
        $length = $endLine - $startLine;

        $source = file($this->getFileName());
        $body = implode("", array_slice($source, $startLine, $length));
        preg_match(self::PATERN_RELATION_METHODS,$body,$relationName);
        preg_match(self::PATERN_USE,implode("",$source),$useName);

       echo "<pre>";
        var_dump($this->getFileName());
        var_dump($this->getNamespaceName());
        var_dump($relationName);
       echo "</pre>";

    }
}
