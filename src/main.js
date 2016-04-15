//////////////////////////////////////////////////////////////////////////////////////
// Entry Point

window.addEventListener("load", function() {
    loadHighScores();
	loadAISettings();
    initRenderer();
    atlas.create();
    initSwipe();
	var anchor = window.location.hash.substring(1);
	if (anchor == "learn") {
		switchState(learnState);
	}
	else if (anchor == "cheat_pac" || anchor == "cheat_mspac") {
		gameMode = (anchor == "cheat_pac") ? GAME_PACMAN : GAME_MSPACMAN;
		practiceMode = true;
        switchState(newGameState);
		for (var i=0; i<4; i++) {
			ghosts[i].isDrawTarget = true;
			ghosts[i].isDrawPath = true;
		}
	}
	else {
		gameMode = GAME_MSPACMAN;
		switchState(newGameState);
	}
    executive.init();

	$("#startingLives").val(NumStartingLives);
	$("#extraLifeScore").val(ExtraLifeScore);

	$("#restartBtn").click(function() {
		var newSettings = {
			numStartingLives: parseInt($("#startingLives").val()),
			extraLifeScore: parseInt($("#extraLifeScore").val())
		};

		saveAISettings(newSettings);
		switchState(newGameState);
	});
});
