const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  }
});

const timeline = [];


// Welcome screen
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <main class="screen">
      <h1>Welcome</h1>
      <p>Treatment Visit Questionnaire Test</p>
      <p>Press any key to begin.</p>
    </main>
  `
});

///Likert Helper Function ///

function addLikertQuestionnaire(questionnaire) {
  questionnaire.items.forEach((item) => {
    timeline.push({
      type: jsPsychSurveyLikert,
      preamble: questionnaire.instructions,
      questions: [
        {
          prompt: `<span class="question-prompt likert-question-text ${questionnaire.name.toLowerCase()}-question-text">${item.text}</span>`,
          labels: questionnaire.scale,
          required: true,
          name: `${questionnaire.name}_${item.name}`
        }
      ],
      button_label: "Next",
      data: {
        questionnaire: questionnaire.name,
        item: item.name,
        question_type: "likert"
      },
      on_load: function () {
        const radios = document.querySelectorAll('input[type="radio"]');

        radios.forEach((radio) => {
          radio.addEventListener("change", () => {
            setTimeout(() => {
              document.querySelector(".jspsych-btn").click();
            }, 250);
          });
        });
      }
    });
  });
}

// Slider Helper Function //

function addSliderQuestionnaire(questionnaire) {
  questionnaire.items.forEach((item) => {
    timeline.push({
      type: jsPsychHtmlSliderResponse,
      stimulus: `
        ${questionnaire.instructions}

        <div class="slider-question">
        <span class="question-prompt slider-question-text">${item.text}</span>
        </div>

        <div class="custom-slider-endpoints">
        <span>0<br>Not at all</span>
        <span>100<br>Extremely</span>
        </div>
        `,
    min: questionnaire.min,
    max: questionnaire.max,
    step: questionnaire.step,
    slider_start: 50,
    labels: [],
      require_movement: true,
      button_label: "Confirm",
      css_classes: ["hide-slider-thumb-until-click","slider-screen"],
      data: {
        questionnaire: questionnaire.name,
        item: item.name,
        question_type: "slider"
      }
    });
  });
}

// Transition screen helper

function addQuestionnaireIntro(title, message) {
  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <main class="screen">
         <p>Click Continue to start the next questionnaire.</p>
      </main>
    `,
    choices: ["Continue"],
     on_load: function () {
      document.querySelector(".jspsych-btn").classList.add("big-continue-btn");
    }
  });
}

//BAES
const BAES ={
    name:"BAES", 
    instructions: `
    <div class="question-instructions">
    <h1 class="questionnaire-title">BAES</h1>
      <p class="main-instruction">
        Please rate the extent to which the words below describe your feelings right now
        by selecting a number between 0 and 10.
      </p>

      <div class="scale-explanation">
      <p>
        <strong>0</strong> means you do not have that feeling at all right now
        (<strong>Not at all</strong>).
      </p>

      <p>
        <strong>10</strong> means you are having that feeling extremely strongly right now
        (<strong>Extremely</strong>).
      </p>

      <p>
        You can also use any of the other numbers in between to rate how you feel.
      </p>
    </div>
    </div>
  `,
  scale: [
    "0<br>Not at all", 
    "1","2","3","4","5","6","7","8","9",
    "10<br>Extremely"
  ], 
    items: [
    {
      text: "Energised",
      name: "energised"
    },
    {
      text: "Excited",
      name: "excited"
    },
    {
      text: "Sedated",
      name: "sedated"
    },
    {
      text: "Slow thoughts",
      name: "slow_thoughts"
    },
    {
      text: "Sluggish",
      name: "sluggish"
    },
    {
      text: "Up",
      name: "up"
    }
  ]
};

addLikertQuestionnaire(BAES);

//CADSS//

const CADSS ={
    name:"CADSS",
    instructions:`
    <div class="question-instructions">
    <h1 class="questionnaire-title">CADSS short</h1>
      <p class="main-instruction"> 
    Please answer these questions in relation to how you are feeling <strong><u>right now</u></strong>
    </p>
    </div>
    `,
      scale: [
    "0<br>Not at all", 
    "1<br>Mild",
    "2<br>Moderate",
    "3<br>Severe",
    "4<br>Extreme"
  ],
  items:[
    {
        text:"1. Do you have some experience that separates you from what is happening; for instance, do you feel as if you are in a movie or a play, or as if you are a robot?",
        name:"CADSS_1"
    },
    {
        text:"2. Do things seem unreal to you, as if you are in a dream?",
        name:"CADSS_2"
    }, 
    {
        text:"3. Do you feel disconnected from your own body?",
        name:"CADSS_3"
    },
    {
        text:"4. Does your sense of your own body feel changed; for instance, does your own body feel unusually large or unusually small?",
        name:"CADDS_4"
    },
    {
        text:"5. Do objects look different than you would expect?",
        name:"CADSS_5"
    },
    {
        text:"6. Have sounds almost disappeared or become much stronger than you would have expected?",
        name:"CADSS_6"
    }   
  ]
};

addQuestionnaireIntro();
addLikertQuestionnaire(CADSS);

//PSI 
const PSI ={
    name:"PSI", 
    instructions:`
    <div class="question-instructions">
    <h1 class="questionnaire-title">PSI short</h1>
      <p class="main-instruction"> 
    Please select the number that best describes your experience <strong><u>right now.</u></strong>
    </p>
    </div>
    `,
    scale: [
    "0=Not at all", 
    "1=Slightly",
    "2=Moderately",
    "3=Strongly"
    ], 
     items:[
        {
            text:"You find it more difficult than usual to start doing things",
            name:"PSI_1"
        },
        {
            text:"You are bothered by the idea that people are watching you",
            name:"PSI_2"
        },
        {
            text:"You find it difficult to think clearly",
            name:"PSI_3"
        },
        {
            text:"Your thoughts are sometimes so strong that you can almost hear them",
            name:"PSI_4"
        },
        {
            text:"You can see shapes and forms even though they aren’t there",
            name:"PSI_5"
        },
        {
            text:"You are easily distracted when doing something or talking to someone",
            name:"PSI_6"
        }
     ]
};

addQuestionnaireIntro();
addLikertQuestionnaire(PSI);

//DEQ
const DEQ ={
    name:"DEQ",
    instructions:`
    <div class="question-instructions">
    <h1 class="questionnaire-title">DEQ</h1>
      <p class="main-instruction"> 
    Please rate how strongly you feel the effects of the gas right now using the sliding scale from 0-100
    </p>
     <div class="scale-explanation">
    <p>‘0’ means ‘Not at all’</p>
    <p>100 means ‘Extremely’</p>
    <p>
    You can also use any value in between.
    </p>
    </div>
    </div>
    `,
    min: 0,
    max: 100,
    step: 1, 
    labels:[
        "0<br>Not at all",
        '100<br><span class="slider-extremely">Extremely</span>'
    ],
    items:[
        {
            text:"Do you <strong>FEEL</strong> a drug effect, right now",
            name:"DEQ_1"
        },
        {
            text:"Are you <strong>HIGH</strong> right now?",
            name:"DEQ_2"
        }, 
        {
            text:"Do you <strong>DISLIKE</strong> any of the effects you are feeling right now?",
            name:"DEQ_3"
        },
        {
            text:"Do you <strong>LIKE</strong> any of the effects you are feeling right now?",
            name:"DEQ_4"
        }, 
        {
            text:"Would you like to feel <strong>MORE</strong> of what you are feeling right now?",
            name:"DEQ_5"
        }
    ]
};

addQuestionnaireIntro();
addSliderQuestionnaire(DEQ)

// End screen
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <main class="screen">
      <h1>Thank you</h1>
      <p>You have completed the experiment.</p>
      <p>Your responses will now be shown on screen for testing.</p>
      <p>Press any key to finish.</p>
    </main>
  `
});


jsPsych.run(timeline);