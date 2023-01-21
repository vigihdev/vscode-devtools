<?php

namespace yii2Reflection;


class App 
{
    public function coreComponents()
    {
        return [
            'request' => 'yii\web\Request',
            'response' =>'yii\web\Response',
            'session' => 'yii\web\Session',
            'user' => 'yii\web\User',
            'errorHandler' => 'yii\web\ErrorHandler',
        ];
    }
}
