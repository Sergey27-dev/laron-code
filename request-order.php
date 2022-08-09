<?php
$name = $_POST['name'];
$kol = $_POST['kol'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$option = $_POST['option'];

$message = "ФИО: ".$name."\n";
$message .= "Почта: ".$email."\n";
$message .= "Телефон: ".$tel."\n";
$message .= "Товар: ".$option."\n";
$message .= "Количество: ".$kol."\n";


require_once (dirname(__FILE__).'/recaptcha/autoload.php');

if(isset($_POST['captcha'])) {
    $recaptcha = new \ReCaptcha\ReCaptcha($secret);
    $resp = $recaptcha->verify($_POST['captcha'], $_SERVER['REMOTE_ADDR']);
    if($resp->isSuccess()) {

        require_once 'vendor/autoload.php';
        $transport = (new Swift_SmtpTransport('smtp.yandex.ru', 465, 'ssl'))
            ->setUsername('')
            ->setPassword('');
        $mailer = new Swift_Mailer($transport);

        $msg = new Swift_Message();
        $msg -> setSubject("Новый заказ");
        $msg -> setFrom(array("" => "Почтовый робот"));
        $msg -> setTo("Laron55@bk.ru");
        $msg -> setBody("Здравствуйте, новый заказ!\n\n"
            . $message
        );

        $result = $mailer->send($msg);

    }else {
        $errors = $resp->getErrorCodes();
        $data['error-captcha'] = $errors;
        $data['msg'] = 'Код капчи не прошёл проверку на сервере';
        $data['result'] = 'error';
    }
}else {
    $data['result'] = "error";
}
