let SELECTORS = {
    frontal_lobe: '.tdc-frontal-lobe',
    cerebellum: '.tdc-cerebellum',
    occipital_lobe: '.tdc-occipital-lobe',
    parietal_lobe: '.tdc-parietal-lobe',
    temporal_lobe: '.tdc-temporal-lobe',
    brain_stem: '.tdc-brain-stem',
    info_title: '.tdc-info-title',
    info_description: '.tdc-info-description',
    filter_container: '.tdc-main-right-filter',
    filter_item: '.tdc-main-right-filter-item',
    brain: '.tdc-main-right-demo-brain'
};

let CLASSES = {
    filter_item: 'tdc-main-right-filter-item'
};

let info = {
    brain: {
        frontal_lobe: {
            'selector': SELECTORS.frontal_lobe,
            'title': 'Frontal Lobe',
            'description': "Picture the Frontal Lobe as the brain's command center, where strategic plans are crafted, complex problems are solved, and decisions are made. It's like the brain's CEO office. But beware, if an unwelcome visitor like a tumor sets up camp here, it could disrupt our executive functions, causing confusion or difficulty in decision-making.",
            'highlight': ['planning', 'motor_functions', 'higher_order_functions',
                          'reasoning', 'judgement', 'impulse_control', 'memory',
                          'language'
            ]
        },

        cerebellum: {
            'selector': SELECTORS.cerebellum,
            'title': 'Cerebellum',
            'description': "Meet the Cerebellum, the brain's maestro of movement. It coordinates our actions with precision, whether we're kicking a soccer ball or playing a musical instrument. But watch out, if an unexpected intruder like a tumor disrupts its rhythm, it could throw off our coordination, causing difficulties in movement and balance.",
            'highlight': ['fine_movement_coordination', 'balance_and_equilibrium',
                          'muscle_tone', 'sense_of_body_position'
            ]
        },

        occipital_lobe: {
            'selector': SELECTORS.occipital_lobe,
            'title': 'Occipital Lobe',
            'description': "Welcome to the Occipital Lobe, the brain's visual processing center. It transforms light into the colorful images we see and helps us make sense of the world around us. But beware, if an unwanted guest like a tumor interferes with its functions, it could distort our perception of reality, leading to visual disturbances or difficulty in recognizing objects.",
            'highlight': ['visual_perception', 'color_recognition', 'reading',
                          'reading_comprehension', 'depth_perception',
                          'recognition_of_object_movement'
            ]
        },

        parietal_lobe: {
            'selector': SELECTORS.parietal_lobe,
            'title': 'Parietal Lobe',
            'description': "Step into the Parietal Lobe, where the brain maps out our sensory experiences and navigates us through space. It's like the brain's GPS system, guiding us through the world. But be cautious, if a disruptive force like a tumor alters its coordinates, it could lead to sensory disruptions or difficulties in spatial awareness.",
            'highlight': ['cognition', 'information_processing', 'touch_sensation',
                          'understanding_spatial_orientation', 'movement_coordination',
                          'speech', 'visual_perception', 'reading', 'writing',
                          'mathematical_computation'
            ]
        },

        temporal_lobe: {
            'selector': SELECTORS.temporal_lobe,
            'title': 'Temporal Lobe',
            'description': "Enter the Temporal Lobe, the brain's memory hub and language center. It preserves our cherished memories and deciphers the intricate codes of language. But be mindful, if an intruder like a tumor disrupts its harmony, it could affect our memory recall or language comprehension, causing communication challenges or memory lapses.",
            'highlight': ['auditory_perception', 'memory', 'speech', 'language_comprehension',
                          'emotional_responses', 'visual_perception', 'facial_recognition'
            ]
        },

        brain_stem: {
            'selector': SELECTORS.brain_stem,
            'title': 'Brain Stem',
            'description': "Introducing the Brain Stem, the brain's vital control tower. It regulates our essential functions like breathing, heart rate, and digestion, keeping us ticking without conscious effort. But stay alert, if an unwelcome guest like a tumor disturbs its equilibrium, it could disrupt our fundamental bodily functions, leading to symptoms like dizziness, weakness, or difficulty in breathing.",
            'highlight': ['alertness', 'arousal', 'breathing', 'blood_pressure',
                          'digestion', 'heart_rate'
            ]
        }
    }
};

let keyToString = (key) => {
    return key.replace(/\_/g, ' ');
}

let brainFunctions = _.shuffle(_.uniq(_.flatten(_.pluck(info.brain, 'highlight'))));

let functionsItems = '';

_.each(brainFunctions, func => {
    functionsItems += `<div class="${CLASSES.filter_item} item-${func}">${keyToString(func)}</div>`;
});

$(SELECTORS.filter_container).append(functionsItems);

_.each(info.brain, (part, k) => {
    $(part.selector).hover(
        () => {
            $(SELECTORS.info_title).html(part.title);
            $(SELECTORS.info_description).html(part.description);

            _.each(part.highlight, func => {
                $(`.item-${func}`).addClass(`${k} active`);
            });
        },

        () => {
            _.each(['active', ..._.keys(info.brain)], (className) => {
                $(SELECTORS.filter_item).removeClass(className);
            });
        }
    );
});
