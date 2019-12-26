Qualtrics.SurveyEngine.addOnload(function(){
	var url = 'https://app-prod-03.implicit.harvard.edu/implicit/user/ezlotnick/qiat/qiat.js'; 
	var self = this;
	var container = self.getQuestionContainer();
	
	container.querySelector('.Inner').style.display = 'none';
	document.querySelector('#SkinContent').style.background = '#3d3e3f';
	self.hideNextButton();
	
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/pi-minno.js';

    scriptTag.onload = onLoad;
    scriptTag.onreadystatechange = onLoad;
    container.appendChild(scriptTag);
	
	var canvas = document.createElement('div');
    container.appendChild(canvas);
	
	function onLoad(){
		minnoJS(canvas, url);
		minnoJS.logger = function(value){
			var el = container.querySelector('input[type="text"]');
			console.log(el);
			el.value = value;
		}		
		minnoJS.onEnd = function(){ setTimeout(self.clickNextButton.bind(self), 100); }
	}
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
