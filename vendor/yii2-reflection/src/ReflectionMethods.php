<?php

namespace yii2Reflection;


class ReflectionMethods extends \ReflectionMethod
{
    const STATIC = 'STATIC';
    const PUBLIC = 'PUBLIC';

    public $type;
    
    public function __construct(string $className, string $methodName)
    {
        parent::__construct($className, $methodName);
    }

    public function getType():string
    {
        $type = '';
        if($this->isPublic()){
            $type = self::PUBLIC;
        }
        if($this->isStatic()){
            $type = self::STATIC;
        }
        return $this->type = $type;
    }
}
