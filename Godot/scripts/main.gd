extends Node2D

var userDataReady = false
var _number = 0

func _ready():
	$Lock.play("locked")
	$Label.text = "1"
	$User.text = "..."
	
func _on_Timer_timeout():
	_number = JavaScript.eval("window.localStorage.getItem('number')")
	if (_number):
		$Label.text = _number

func _on_btnRestart_pressed():
	var restartNum = 1
	JavaScript.eval(str("parent.restartNumber(", restartNum, ")"))

func _on_btnIncrease_pressed():
	JavaScript.eval("parent.increaseNumber()")

func _on_btnDecrease_pressed():
	JavaScript.eval("parent.decreaseNumber()")

func _on_checkLogin_timeout():
	var _logged = JavaScript.eval("window.localStorage.getItem('logged')")
	if (_logged):
		if (_logged == "1"):
			$Lock.play("unlocked")
			
			# Return user data
			if (userDataReady == false):
				userDataReady = true
				JavaScript.eval(str("parent.api_get_user(", _number, ")"))
				$CheckUser.start()
			return
	
	$Lock.play("locked")
	$CheckUser.stop()
	$User.text = ""
	userDataReady = false

func _on_CheckUser_timeout():
	var userData = JavaScript.eval("window.localStorage.getItem('user')")
	if (userData):
		$CheckUser.stop()
		
		var stringResult: String = userData
		var jsonParseResult: JSONParseResult = JSON.parse(stringResult)
		var userJson = jsonParseResult.result
		$User.text = str(userJson["title"])
