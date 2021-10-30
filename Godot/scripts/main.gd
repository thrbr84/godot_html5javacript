extends Node2D

func _ready():
	$Lock.play("locked")
	$Label.text = "1"
	
func _on_Timer_timeout():
	var _number = JavaScript.eval("window.localStorage.getItem('number')")
	if (_number):
		$Label.text = _number

func _on_btnRestart_pressed():
	JavaScript.eval("parent.restartNumber()")

func _on_btnIncrease_pressed():
	JavaScript.eval("parent.increaseNumber()")

func _on_btnDecrease_pressed():
	JavaScript.eval("parent.decreaseNumber()")

func _on_checkLogin_timeout():
	var _logged = JavaScript.eval("window.localStorage.getItem('logged')")
	if (_logged):
		if (_logged == "1"):
			$Lock.play("unlocked")
			return
	
	$Lock.play("locked")
