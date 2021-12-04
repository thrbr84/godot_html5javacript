extends Node2D

var userDataReady = false
var _number = 0
var volume = 0.5

func _ready():
	
	
	var firstName = "Thiago"
	#var lastName = "Bruno"
	#var emailCreate = "thiago@email.com"
	#var wallet = "123456"
	#var passWordCreate = "123"
	#var passWordConfirm = "1230"
	#print(str("parent.creatAccount('",firstName,"','",lastName,"','",emailCreate,"','",wallet,"','",passWordCreate,"','",passWordConfirm,"')"))
	
	
	_get_user_volume()
	
	$Lock.play("locked")
	$Label.text = "1"
	$User.text = "..."

func _get_user_volume():
	var userVolume = JavaScript.eval("window.localStorage.getItem('currentAudioVolume')")
	if (userVolume):
		volume = float(userVolume)

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


func _on_btnAudio1_pressed():
	JavaScript.eval(str("parent.playAudio('RaveDigger')"))

func _on_btnAudio2_pressed():
	JavaScript.eval(str("parent.playAudio('80sVibe')"))

func _on_btnAudio3_pressed():
	JavaScript.eval(str("parent.playAudio('RunningOut')"))

func _on_btnStop_pressed():
	JavaScript.eval(str("parent.stopAudioAll()"))

func _on_btnVolumeMinus_pressed():
	_get_user_volume()
	volume -= 0.1
	if volume < 0:
		volume = 0
	JavaScript.eval(str("parent.setAudioVolume(",volume,")"))

func _on_btnVolumePlus_pressed():
	_get_user_volume()
	volume += 0.1
	if volume > 1:
		volume = 1
	JavaScript.eval(str("parent.setAudioVolume(",volume,")"))
