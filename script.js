const container = document.getElementById('main');
const text1 = new Blotter.Text('The Circular Ruins', { family: 'serif', size: 120, fill: '#fff', paddingBottom: 20 });
const text2 = new Blotter.Text('Jorge Luis Borges', { family: 'serif', size: 80, fill: '#fff', paddingTop: 20 });
const material = new Blotter.LiquidDistortMaterial();
material.uniforms.uSpeed.value = 0.3;
material.uniforms.uVolatility.value = 0.1;
material.uniforms.uSeed.value = 0.1;
const blotter = new Blotter(material, { texts: [text1, text2] });
blotter.forText(text1).appendTo(container);
blotter.forText(text2).appendTo(container);

class WaterRipple {
    constructor() {
        this.res = 200;
        this.active = false;
        this.init();
    }
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'ripple-canvas';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.res;
        this.canvas.height = Math.round(this.res * (this.height / this.width));
        
        this.size = this.canvas.width * this.canvas.height;
        this.buffer1 = new Float32Array(this.size);
        this.buffer2 = new Float32Array(this.size);
        
        window.addEventListener('mousemove', (e) => {
            if (!this.active) return;
            const x = Math.round((e.clientX / this.width) * this.canvas.width);
            const y = Math.round((e.clientY / this.height) * this.canvas.height);
            if (x > 1 && x < this.canvas.width - 1 && y > 1 && y < this.canvas.height - 1) {
                this.buffer1[y * this.canvas.width + x] = 500;
            }
        });
    }
    update() {
        if (!this.active) return;
        
        let imgData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        let data = imgData.data;

        for (let i = this.canvas.width; i < this.size - this.canvas.width; i++) {
            this.buffer2[i] = ((this.buffer1[i-1] + this.buffer1[i+1] + 
                              this.buffer1[i-this.canvas.width] + this.buffer1[i+this.canvas.width]) >> 1) - this.buffer2[i];
            this.buffer2[i] *= 0.98;

            let v = Math.abs(this.buffer2[i]);
            let idx = i * 4;
            data[idx] = v * 2;
            data[idx+1] = v * 2;
            data[idx+2] = v * 2;
            data[idx+3] = 255;
        }

        let temp = this.buffer1;
        this.buffer1 = this.buffer2;
        this.buffer2 = temp;

        this.ctx.putImageData(imgData, 0, 0);
        requestAnimationFrame(() => this.update());
    }
}
const rippleEffect = new WaterRipple();
const contentData = {
    about: `<p>"The Circular Ruins" (Spanish: Las ruinas circulares) is a short story by Argentine author Jorge Luis Borges. First published in the literary journal Sur in December 1940, it was included in the 1941 collection The Garden of Forking Paths (Spanish: El jardín de senderos que se bifurcan) and the 1944 collection Ficciones. It was first published in English in View (Series V, No. 6 1946), translated by Paul Bowles. Since publication, it has become one of Borges's best-known stories. The story is about a man who gradually dreams another man into existence in the ruins of an ancient temple. Though he is successful, the dreamer realizes at the story's conclusion that he himself is someone else's dream. Critics have interpreted "The Circular Ruins" as exploring themes of philosophical idealism, Gnosticism or kabbalism, and creativity.
    <br>
    <br>
    "The Circular Ruins" has become one of Borges's best-known stories. Critic David C. Howard argues that Colombian novelist Gabriel García Márquez was influenced by this story and other work by Borges in the writing of his 1967 novel One Hundred Years of Solitude (Cien años de soledad), in which several characters are able to dream people or events into existence. The story has also been cited as a forerunner of the reality-bending work of science fiction author Philip K. Dick. Along with another Borges story, "The Secret Miracle", "The Circular Ruins" was an influence on the Christopher Nolan science fiction film Inception, in which characters move between reality, dreams, and dreams-within-dreams. In their book Gender Trouble, gender studies philosopher Judith Butler uses the story as an allegory for how gender is socially constructed. In another of Borges's stories, "An Examination of the Work of Herbert Quain", Borges jokingly states that he derived "The Circular Ruins" from the work of the fictional author Herbert Quain.
    </p>`,
    story: `<p>No one saw him disembark in the unanimous night, no one saw the bamboo canoe sink into the sacred mud, but in a few days there was no one who did not know that the taciturn man came from the South and that his home had been one of those numberless villages upstream in the deeply cleft side of the mountain, where the Zend language has not been contaminated by Greek and where leprosy is infrequent. What is certain is that the grey man kissed the mud, climbed up the bank with pushing aside (probably, without feeling) the blades which were lacerating his flesh, and crawled, nauseated and bloodstained, up to the circular enclosure crowned with a stone tiger or horse, which sometimes was the color of flame and now was that of ashes. This circle was a temple which had been devoured by ancient fires, profaned by the miasmal jungle, and whose god no longer received the homage of men. The stranger stretched himself out beneath the pedestal. He was awakened by the sun high overhead. He was not astonished to find that his wounds had healed; he closed his pallid eyes and slept, not through weakness of flesh but through determination of will. He knew that this temple was the place required for his invincible intent; he knew that the incessant trees had not succeeded in strangling the ruins of another propitious temple downstream which had once belonged to gods now burned and dead; he knew that his immediate obligation was to dream. Toward midnight he was awakened by the inconsolable shriek of a bird. Tracks of bare feet, some figs and a jug warned him that the men of the region had been spying respectfully on his sleep, soliciting his protection or afraid of his magic. He felt a chill of fear, and sought out a sepulchral niche in the dilapidated wall where he concealed himself among unfamiliar leaves.
    <br>
    <br>
    The purpose which guided him was not impossible, though supernatural. He wanted to dream a man; he wanted to dream him in minute entirety and impose him on reality. This magic project had exhausted the entire expanse of his mind; if someone had asked him his name or to relate some event of his former life, he would not have been able to give an answer. This uninhabited, ruined temple suited him, for it is contained a minimum of visible world; the proximity of the workmen also suited him, for they took it upon themselves to provide for his frugal needs. The rice and fruit they brought him were nourishment enough for his body, which was consecrated to the sole task of sleeping and dreaming.
    <br>
    <br>
    At first, his dreams were chaotic; then in a short while they became dialectic in nature. The stranger dreamed that he was in the center of a circular amphitheater which was more or less the burnt temple; clouds of taciturn students filled the tiers of seats; the faces of the farthest ones hung at a distance of many centuries and as high as the stars, but their features were completely precise. The man lectured his pupils on anatomy, cosmography, and magic: the faces listened anxiously and tried to answer understandingly, as if they guessed the importance of that examination which would redeem one of them from his condition of empty illusion and interpolate him into the real world. Asleep or awake, the man thought over the answers of his phantoms, did not allow himself to be deceived by imposters, and in certain perplexities he sensed a growing intelligence. He was seeking a soul worthy of participating in the universe.
    <br>
    <br>
    After nine or ten nights he understood with a certain bitterness that he could expect nothing from those pupils who accepted his doctrine passively, but that he could expect something from those who occasionally dared to oppose him. The former group, although worthy of love and affection, could not ascend to the level of individuals; the latter pre-existed to a slightly greater degree. One afternoon (now afternoons were also given over to sleep, now he was only awake for a couple hours at daybreak) he dismissed the vast illusory student body for good and kept only one pupil. He was a taciturn, sallow boy, at times intractable, and whose sharp features resembled of those of his dreamer. The brusque elimination of his fellow students did not disconcert him for long; after a few private lessons, his progress was enough to astound the teacher. Nevertheless, a catastrophe took place. One day, the man emerged from his sleep as if from a viscous desert, looked at the useless afternoon light which he immediately confused with the dawn, and understood that he had not dreamed. All that night and all day long, the intolerable lucidity of insomnia fell upon him. He tried exploring the forest, to lose his strength; among the hemlock he barely succeeded in experiencing several short snatchs of sleep, veined with fleeting, rudimentary visions that were useless. He tried to assemble the student body but scarcely had he articulated a few brief words of exhortation when it became deformed and was then erased. In his almost perpetual vigil, tears of anger burned his old eyes.
    <br>
    <br>
    He understood that modeling the incoherent and vertiginous matter of which dreams are composed was the most difficult task that a man could undertake, even though he should penetrate all the enigmas of a superior and inferior order; much more difficult than weaving a rope out of sand or coining the faceless wind. He swore he would forget the enormous hallucination which had thrown him off at first, and he sought another method of work. Before putting it into execution, he spent a month recovering his strength, which had been squandered by his delirium. He abandoned all premeditation of dreaming and almost immediately succeeded in sleeping a reasonable part of each day. The few times that he had dreams during this period, he paid no attention to them. Before resuming his task, he waited until the moon's disk was perfect. Then, in the afternoon, he purified himself in the waters of the river, worshiped the planetary gods, pronounced the prescribed syllables of a mighty name, and went to sleep. He dreamed almost immediately, with his heart throbbing.
    <br>
    <br>
    He dreamed that it was warm, secret, about the size of a clenched fist, and of a garnet color within the penumbra of a human body as yet without face or sex; during fourteen lucid nights he dreampt of it with meticulous love. Every night he perceived it more clearly. He did not touch it; he only permitted himself to witness it, to observe it, and occasionally to rectify it with a glance. He perceived it and lived it from all angles and distances. On the fourteenth night he lightly touched the pulmonary artery with his index finger, then the whole heart, outside and inside. He was satisfied with the examination. He deliberately did not dream for a night; he took up the heart again, invoked the name of a planet, and undertook the vision of another of the principle organs. Within a year he had come to the skeleton and the eyelids. The innumerable hair was perhaps the most difficult task. He dreamed an entire man--a young man, but who did not sit up or talk, who was unable to open his eyes. Night after night, the man dreamt him asleep.
    <br>
    <br>
    In the Gnostic cosmosgonies, demiurges fashion a red Adam who cannot stand; as a clumsy, crude and elemental as this Adam of dust was the Adam of dreams forged by the wizard's nights. One afternoon, the man almost destroyed his entire work, but then changed his mind. (It would have been better had he destroyed it.) When he had exhausted all supplications to the deities of earth, he threw himself at the feet of the effigy which was perhaps a tiger or perhaps a colt and implored its unknown help. That evening, at twilight, he dreamt of the statue. He dreamt it was alive, tremulous: it was not an atrocious bastard of a tiger and a colt, but at the same time these two firey creatures and also a bull, a rose, and a storm. This multiple god revealed to him that his earthly name was Fire, and that in this circular temple (and in others like it) people had once made sacrifices to him and worshiped him, and that he would magically animate the dreamed phantom, in such a way that all creatures, except Fire itself and the dreamer, would believe to be a man of flesh and blood. He commanded that once this man had been instructed in all the rites, he should be sent to the other ruined temple whose pyramids were still standing downstream, so that some voice would glorify him in that deserted ediface. In the dream of the man that dreamed, the dreamed one awoke.
    <br>
    <br>
    The wizard carried out the orders he had been given. He devoted a certain length of time (which finally proved to be two years) to instructing him in the mysteries of the universe and the cult of fire. Secretly, he was pained at the idea of being seperated from him. On the pretext of pedagogical necessity, each day he increased the number of hours dedicated to dreaming. He also remade the right shoulder, which was somewhat defective. At times, he was disturbed by the impression that all this had already happened . . . In general, his days were happy; when he closed his eyes, he thought: Now I will be with my son. Or, more rarely: The son I have engendered is waiting for me and will not exist if I do not go to him.
    <br>
    <br>
    Gradually, he began accustoming him to reality. Once he ordered him to place a flag on a faraway peak. The next day the flag was fluttering on the peak. He tried other analogous experiments, each time more audacious. With a certain bitterness, he understood that his son was ready to be born--and perhaps impatient. That night he kissed him for the first time and sent him off to the other temple whose remains were turning white downstream, across many miles of inextricable jungle and marshes. Before doing this (and so that his son should never know that he was a phantom, so that he should think himself a man like any other) he destroyed in him all memory of his years of apprenticeship.
    <br>
    <br>
    His victory and peace became blurred with boredom. In the twilight times of dusk and dawn, he would prostrate himself before the stone figure, perhaps imagining his unreal son carrying out identical rites in other circular ruins downstream; at night he no longer dreamed, or dreamed as any man does. His perceptions of the sounds and forms of the universe became somewhat pallid: his absent son was being nourished by these diminution of his soul. The purpose of his life had been fulfilled; the man remained in a kind of ecstasy. After a certain time, which some chronicles prefer to compute in years and others in decades, two oarsmen awoke him at midnight; he could not see their faces, but they spoke to him of a charmed man in a temple of the North, capable of walking on fire without burning himself. The wizard suddenly remembered the words of the god. He remembered that of all the creatures that people the earth, Fire was the only one who knew his son to be a phantom. This memory, which at first calmed him, ended by tormenting him. He feared lest his son should meditate on this abnormal privilege and by some means find out he was a mere simulacrum. Not to be a man, to be a projection of another man's dreams--what an incomparable humiliation, what madness! Any father is interested in the sons he has procreated (or permitted) out of the mere confusion of happiness; it was natural that the wizard should fear for the future of that son whom he had thought out entrail by entrail, feature by feature, in a thousand and one secret nights.
    <br>
    <br>
    His misgivings ended abruptly, but not without certain forewarnings. First (after a long drought) a remote cloud, as light as a bird, appeared on a hill; then, toward the South, the sky took on the rose color of leopard's gums; then came clouds of smoke which rusted the metal of the nights; afterwards came the panic-stricken flight of wild animals. For what had happened many centuries before was repeating itself. The ruins of the sanctuary of the god of Fire was destroyed by fire. In a dawn without birds, the wizard saw the concentric fire licking the walls. For a moment, he thought of taking refuge in the water, but then he understood that death was coming to crown his old age and absolve him from his labors. He walked toward the sheets of flame. They did not bite his flesh, they caressed him and flooded him without heat or combustion. With relief, with humiliation, with terror, he understood that he also was an illusion, that someone else was dreaming him.
    </p>`,
    Echoes: `<h1 class="comment-title">Echoes:</h1>
    <p class="comment-subtitle">You can say anything here, because only you can see it, and after a while it will vanish, like words spoken in a dream...</p><div class="input-group"><input type="text" id="msgInput" class="comment-input" autocomplete="off" placeholder="Write here..."><div class="send-btn" onclick="sendComment()">Send</div></div><div id="commentList" class="comment-list"></div>`,
    ruin_1: `
    <div class="video-text-wrapper">
        <video autoplay muted loop playsinline class="video-source">
            <source src="fire.mp4">
        </video>
        <div class="video-text-content">
            <h1>Ruins 1</h1>
            <p>No one saw him disembark in the unanimous night, no one saw the bamboo canoe sink into the sacred mud, but in a few days there was no one who did not know that the taciturn man came from the South and that his home had been one of those numberless villages upstream in the deeply cleft side of the mountain, where the Zend language has not been contaminated by Greek and where leprosy is infrequent. What is certain is that the grey man kissed the mud, climbed up the bank with pushing aside (probably, without feeling) the blades which were lacerating his flesh, and crawled, nauseated and bloodstained, up to the circular enclosure crowned with a stone tiger or horse, which sometimes was the color of flame and now was that of ashes. <span style="color: #ff4d4d;">This circle was a temple which had been devoured by ancient fires, profaned by the miasmal jungle, and whose god no longer received the homage of men. The stranger stretched himself out beneath the pedestal. He was awakened by the sun high overhead. He was not astonished to find that his wounds had healed; he closed his pallid eyes and slept, not through weakness of flesh but through determination of will. He knew that this temple was the place required for his invincible intent; he knew that the incessant trees had not succeeded in strangling the ruins of another propitious temple downstream which had once belonged to gods now burned and dead; he knew that his immediate obligation was to dream. Toward midnight he was awakened by the inconsolable shriek of a bird. Tracks of bare feet, some figs and a jug warned him that the men of the region had been spying respectfully on his sleep, soliciting his protection or afraid of his magic. He felt a chill of fear, and sought out a sepulchral niche in the dilapidated wall where he concealed himself among unfamiliar leaves.
            <br>
            <br>
            The purpose which guided him was not impossible, though supernatural. He wanted to dream a man; he wanted to dream him in minute entirety and impose him on reality. This magic project had exhausted the entire expanse of his mind; if someone had asked him his name or to relate some event of his former life, he would not have been able to give an answer. This uninhabited, ruined temple suited him, for it is contained a minimum of visible world; the proximity of the workmen also suited him, for they took it upon themselves to provide for his frugal needs. The rice and fruit they brought him were nourishment enough for his body, which was consecrated to the sole task of sleeping and dreaming.
            </p>
            </div>
        </div>
    </div>`,
    ruin_2: `
    <div id="scatter-container" style="cursor: pointer; height: 100%; min-height: 500px; padding: 20px;">
        <h1>Ruins 2</h1>
        <p id="scatter-text" style="line-height: 1.8; text-align: justify;">
            <span>At</span> <span>first,</span> <span>his</span> <span>dreams</span> <span>were</span> <span>chaotic;</span> <span>then</span> <span>in</span> <span>a</span> <span>short</span> <span>while</span> <span>they</span> <span>became</span> <span>dialectic</span> <span>in</span> <span>nature.</span> 
            <span>The</span> <span>stranger</span> <span>dreamed</span> <span>that</span> <span>he</span> <span>was</span> <span>in</span> <span>the</span> <span>center</span> <span>of</span> <span>a</span> <span>circular</span> <span>amphitheater</span> <span>which</span> <span>was</span> <span>more</span> <span>or</span> <span>less</span> <span>the</span> <span>burnt</span> <span>temple;</span> 
            <span>clouds</span> <span>of</span> <span>taciturn</span> <span>students</span> <span>filled</span> <span>the</span> <span>tiers</span> <span>of</span> <span>seats;</span> <span>the</span> <span>faces</span> <span>of</span> <span>the</span> <span>farthest</span> <span>ones</span> <span>hung</span> <span>at</span> <span>a</span> <span>distance</span> <span>of</span> <span>many</span> <span>centuries</span> <span>and</span> <span>as</span> <span>high</span> <span>as</span> <span>the</span> <span>stars,</span> 
            <span>but</span> <span>their</span> <span>features</span> <span>were</span> <span>completely</span> <span>precise.</span> <span>The</span> <span>man</span> <span>lectured</span> <span>his</span> <span>pupils</span> <span>on</span> <span>anatomy,</span> <span>cosmography,</span> <span>and</span> <span>magic:</span> <span>the</span> <span>faces</span> <span>listened</span> <span>anxiously</span> <span>and</span> <span>tried</span> <span>to</span> <span>answer</span> <span>understandingly,</span> 
            <span>as</span> <span>if</span> <span>they</span> <span>guessed</span> <span>the</span> <span>importance</span> <span>of</span> <span>that</span> <span>examination</span> <span>which</span> <span>would</span> <span>redeem</span> <span>one</span> <span>of</span> <span>them</span> <span>from</span> <span>his</span> <span>condition</span> <span>of</span> <span>empty</span> <span>illusion</span> <span>and</span> <span>interpolate</span> <span>him</span> <span>into</span> <span>the</span> <span>real</span> <span>world.</span> 
            <span>Asleep</span> <span>or</span> <span>awake,</span> <span>the</span> <span>man</span> <span>thought</span> <span>over</span> <span>the</span> <span>answers</span> <span>of</span> <span>his</span> <span>phantoms,</span> <span>did</span> <span>not</span> <span>allow</span> <span>himself</span> <span>to</span> <span>be</span> <span>deceived</span> <span>by</span> <span>imposters,</span> <span>and</span> <span>in</span> <span>certain</span> <span>perplexities</span> 
            <span>he</span> <span>sensed</span> <span>a</span> <span>growing</span> <span>intelligence.</span> <span>He</span> <span>was</span> <span>seeking</span> <span>a</span> <span>soul</span> <span>worthy</span> <span>of</span> <span>participating</span> <span>in</span> <span>the</span> <span>universe.</span>
            <br><br>
            <span>After</span> <span>nine</span> <span>or</span> <span>ten</span> <span>nights</span> <span>he</span> <span>understood</span> <span>with</span> <span>a</span> <span>certain</span> <span>bitterness</span> <span>that</span> <span>he</span> <span>could</span> <span>expect</span> <span>nothing</span> <span>from</span> <span>those</span> <span>pupils</span> <span>who</span> <span>accepted</span> <span>his</span> <span>doctrine</span> <span>passively,</span> 
            <span>but</span> <span>that</span> <span>he</span> <span>could</span> <span>expect</span> <span>something</span> <span>from</span> <span>those</span> <span>who</span> <span>occasionally</span> <span>dared</span> <span>to</span> <span>oppose</span> <span>him.</span> <span>The</span> <span>former</span> <span>group,</span> <span>although</span> <span>worthy</span> <span>of</span> <span>love</span> <span>and</span> <span>affection,</span> 
            <span>could</span> <span>not</span> <span>ascend</span> <span>to</span> <span>the</span> <span>level</span> <span>of</span> <span>individuals;</span> <span>the</span> <span>latter</span> <span>pre-existed</span> <span>to</span> <span>a</span> <span>slightly</span> <span>greater</span> <span>degree.</span> <span>One</span> <span>afternoon</span> <span>(now</span> <span>afternoons</span> <span>were</span> <span>also</span> <span>given</span> <span>over</span> <span>to</span> <span>sleep,</span> 
            <span>now</span> <span>he</span> <span>was</span> <span>only</span> <span>awake</span> <span>for</span> <span>a</span> <span>couple</span> <span>hours</span> <span>at</span> <span>daybreak)</span> <span>he</span> <span>dismissed</span> <span>the</span> <span>vast</span> <span>illusory</span> <span>student</span> <span>body</span> <span>for</span> <span>good</span> <span>and</span> <span>kept</span> <span>only</span> <span>one</span> <span>pupil.</span> 
            <span>He</span> <span>was</span> <span>a</span> <span>taciturn,</span> <span>sallow</span> <span>boy,</span> <span>at</span> <span>times</span> <span>intractable,</span> <span>and</span> <span>whose</span> <span>sharp</span> <span>features</span> <span>resembled</span> <span>of</span> <span>those</span> <span>of</span> <span>his</span> <span>dreamer.</span> <span>The</span> <span>brusque</span> <span>elimination</span> <span>of</span> <span>his</span> <span>fellow</span> <span>students</span> 
            <span>did</span> <span>not</span> <span>disconcert</span> <span>him</span> <span>for</span> <span>long;</span> <span>after</span> <span>a</span> <span>few</span> <span>private</span> <span>lessons,</span> <span>his</span> <span>progress</span> <span>was</span> <span>enough</span> <span>to</span> <span>astound</span> <span>the</span> <span>teacher.</span> <span>Nevertheless,</span> <span>a</span> <span>catastrophe</span> <span>took</span> <span>place.</span> 
            <span>One</span> <span>day,</span> <span>the</span> <span>man</span> <span>emerged</span> <span>from</span> <span>his</span> <span>sleep</span> <span>as</span> <span>if</span> <span>from</span> <span>a</span> <span>viscous</span> <span>desert,</span> <span>looked</span> <span>at</span> <span>the</span> <span>useless</span> <span>afternoon</span> <span>light</span> <span>which</span> <span>he</span> <span>immediately</span> <span>confused</span> <span>with</span> <span>the</span> <span>dawn,</span> 
            <span>and</span> <span>understood</span> <span>that</span> <span>he</span> <span>had</span> <span>not</span> <span>dreamed.</span> <span>All</span> <span>that</span> <span>night</span> <span>and</span> <span>all</span> <span>day</span> <span>long,</span> <span>the</span> <span>intolerable</span> <span>lucidity</span> <span>of</span> <span>insomnia</span> <span>fell</span> <span>upon</span> <span>him.</span> <span>He</span> <span>tried</span> <span>exploring</span> <span>the</span> <span>forest,</span> 
            <span>to</span> <span>lose</span> <span>his</span> <span>strength;</span> <span>among</span> <span>the</span> <span>hemlock</span> <span>he</span> <span>barely</span> <span>succeeded</span> <span>in</span> <span>experiencing</span> <span>several</span> <span>short</span> <span>snatchs</span> <span>of</span> <span>sleep,</span> <span>veined</span> <span>with</span> <span>fleeting,</span> <span>rudimentary</span> <span>visions</span> <span>that</span> <span>were</span> <span>useful.</span> 
            <span>He</span> <span>tried</span> <span>to</span> <span>assemble</span> <span>the</span> <span>student</span> <span>body</span> <span>but</span> <span>scarcely</span> <span>had</span> <span>he</span> <span>articulated</span> <span>a</span> <span>few</span> <span>brief</span> <span>words</span> <span>of</span> <span>exhortation</span> <span>when</span> <span>it</span> <span>became</span> <span>deformed</span> <span>and</span> <span>was</span> <span>then</span> <span>erased.</span> 
            <span>In</span> <span>his</span> <span>almost</span> <span>perpetual</span> <span>vigil,</span> <span>tears</span> <span>of</span> <span>anger</span> <span>burned</span> <span>his</span> <span>old</span> <span>eyes.</span>
        </p>
    </div>
`,
    ruin_3: `<h1>Ruins 3</h1>
    <p>He understood that modeling the incoherent and vertiginous matter of which dreams are composed was the most difficult task that a man could undertake, even though he should penetrate all the enigmas of a superior and inferior order; much more difficult than weaving a rope out of sand or coining the faceless wind. He swore he would forget the enormous hallucination which had thrown him off at first, and he sought another method of work. Before putting it into execution, he spent a month recovering his strength, which had been squandered by his delirium. He abandoned all premeditation of dreaming and almost immediately succeeded in sleeping a reasonable part of each day. The few times that he had dreams during this period, he paid no attention to them. Before resuming his task, he waited until the moon's disk was perfect. Then, in the afternoon, he purified himself in the waters of the river, worshiped the planetary gods, pronounced the prescribed syllables of a mighty name, and went to sleep. He dreamed almost immediately, with his heart throbbing.
    <br>
    <br>
    He dreamed that it was warm, secret, about the size of a clenched fist, and of a garnet color within the penumbra of a human body as yet without face or sex; during fourteen lucid nights he dreampt of it with meticulous love. Every night he perceived it more clearly. He did not touch it; he only permitted himself to witness it, to observe it, and occasionally to rectify it with a glance. He perceived it and lived it from all angles and distances. On the fourteenth night he lightly touched the pulmonary artery with his index finger, then the whole heart, outside and inside. He was satisfied with the examination. He deliberately did not dream for a night; he took up the heart again, invoked the name of a planet, and undertook the vision of another of the principle organs. Within a year he had come to the skeleton and the eyelids. The innumerable hair was perhaps the most difficult task. He dreamed an entire man--a young man, but who did not sit up or talk, who was unable to open his eyes. Night after night, the man dreamt him asleep.
    </p>
</div>
    `,
    ruin_4: `<h1>Ruins 4</h1>
    <p>In the Gnostic cosmosgonies, demiurges fashion a red Adam who cannot stand; as a clumsy, crude and elemental as this Adam of dust was the Adam of dreams forged by the wizard's nights. One afternoon, the man almost destroyed his entire work, but then changed his mind. (It would have been better had he destroyed it.) When he had exhausted all supplications to the deities of earth, he threw himself at the feet of the effigy which was perhaps a tiger or perhaps a colt and implored its unknown help. That evening, at twilight, he dreamt of the statue. He dreamt it was alive, tremulous: it was not an atrocious bastard of a tiger and a colt, but at the same time these two firey creatures and also a bull, a rose, and a storm. This multiple god revealed to him that his earthly name was Fire, and that in this circular temple (and in others like it) people had once made sacrifices to him and worshiped him, and that he would magically animate the dreamed phantom, in such a way that all creatures, except Fire itself and the dreamer, would believe to be a man of flesh and blood. He commanded that once this man had been instructed in all the rites, he should be sent to the other ruined temple whose pyramids were still standing downstream, so that some voice would glorify him in that deserted ediface. In the dream of the man that dreamed, the dreamed one awoke.
    </p>
</div>`,
    ruin_5: `
<div class="distort-apply">
    <h1>Ruins 5</h1>
    <p>
    The wizard carried out the orders he had been given. He devoted a certain length of time (which finally proved to be two years) to instructing him in the mysteries of the universe and the cult of fire. Secretly, he was pained at the idea of being seperated from him. On the pretext of pedagogical necessity, each day he increased the number of hours dedicated to dreaming. He also remade the right shoulder, which was somewhat defective. At times, he was disturbed by the impression that all this had already happened . . . In general, his days were happy; when he closed his eyes, he thought: Now I will be with my son. Or, more rarely: The son I have engendered is waiting for me and will not exist if I do not go to him.
    <br>
    <br>
    Gradually, he began accustoming him to reality. Once he ordered him to place a flag on a faraway peak. The next day the flag was fluttering on the peak. He tried other analogous experiments, each time more audacious. With a certain bitterness, he understood that his son was ready to be born--and perhaps impatient. That night he kissed him for the first time and sent him off to the other temple whose remains were turning white downstream, across many miles of inextricable jungle and marshes. Before doing this (and so that his son should never know that he was a phantom, so that he should think himself a man like any other) he destroyed in him all memory of his years of apprenticeship.
    <br>
    <br>
    His victory and peace became blurred with boredom. In the twilight times of dusk and dawn, he would prostrate himself before the stone figure, perhaps imagining his unreal son carrying out identical rites in other circular ruins downstream; at night he no longer dreamed, or dreamed as any man does. His perceptions of the sounds and forms of the universe became somewhat pallid: his absent son was being nourished by these diminution of his soul. The purpose of his life had been fulfilled; the man remained in a kind of ecstasy. After a certain time, which some chronicles prefer to compute in years and others in decades, two oarsmen awoke him at midnight; he could not see their faces, but they spoke to him of a charmed man in a temple of the North, capable of walking on fire without burning himself. The wizard suddenly remembered the words of the god. He remembered that of all the creatures that people the earth, Fire was the only one who knew his son to be a phantom. This memory, which at first calmed him, ended by tormenting him. He feared lest his son should meditate on this abnormal privilege and by some means find out he was a mere simulacrum. Not to be a man, to be a projection of another man's dreams--what an incomparable humiliation, what madness! Any father is interested in the sons he has procreated (or permitted) out of the mere confusion of happiness; it was natural that the wizard should fear for the future of that son whom he had thought out entrail by entrail, feature by feature, in a thousand and one secret nights.
    </p>
    </div>`,
    ruin_6: `
        <div class="video-text-wrapper">
        <video autoplay muted loop playsinline class="video-source">
            <source src="fire.mp4">
        </video>
        <div class="video-text-content">
    <h1>Ruins 6</h1>
    <p>His misgivings ended abruptly, but not without certain forewarnings. First (after a long drought) a remote cloud, as light as a bird, appeared on a hill; then, toward the South, the sky took on the rose color of leopard's gums; then came clouds of smoke which rusted the metal of the nights; afterwards came the panic-stricken flight of wild animals. For what had happened many centuries before was repeating itself. The ruins of the sanctuary of the god of Fire was destroyed by fire. In a dawn without birds, the wizard saw the concentric fire licking the walls. For a moment, he thought of taking refuge in the water, but then he understood that death was coming to crown his old age and absolve him from his labors. He walked toward the sheets of flame. They did not bite his flesh, they caressed him and flooded him without heat or combustion. With relief, with humiliation, with terror, he understood that he also was an illusion, that someone else was dreaming him.
        </p>
         </div>
        </div>
    </div>`
};

function openOverlay(type) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');
    const globalLink = document.getElementById('global-story-link');
    content.innerHTML = contentData[type];
    overlay.style.display = 'block';
    globalLink.style.display = type.includes('ruin') ? 'block' : 'none';

    if (type === 'ruin_3') {
        overlay.classList.add('ripple-active');
        rippleEffect.active = true;
        document.getElementById('ripple-canvas').style.display = 'block';
        rippleEffect.update();
    } else {
        overlay.classList.remove('ripple-active');
        rippleEffect.active = false;
        document.getElementById('ripple-canvas').style.display = 'none';
    }

    if (type === 'ruin_5') {
    const content = document.getElementById('overlay-content');
    setTimeout(() => {
        const el = document.querySelector('.distort-apply');
        if (el) {
            let isDistorted = true;
            el.style.filter = "url('#distort-filter')";
            el.style.webkitFilter = "url('#distort-filter')";

            el.onclick = function(e) {
                e.stopPropagation();
                
                if (isDistorted) {
                    this.style.filter = "none";
                    this.style.webkitFilter = "none";
                } else {
                    this.style.filter = "url('#distort-filter')";
                    this.style.webkitFilter = "url('#distort-filter')";
                }
                isDistorted = !isDistorted;
            };
        }
    }, 20);
}
    if (type === 'ruin_4') {
    initScratchEffect();
} else {
    removeScratchEffect();
}
    if (type === 'ruin_2') {
        const container = document.getElementById('scatter-container');
        if (container) {
            const words = container.querySelectorAll('#scatter-text span');
            words.forEach(word => word.classList.add('scatter-word'));
            const scatterAction = function(e) {
                e.preventDefault();
                words.forEach(word => {
                    const randomX = Math.random() * (window.innerWidth - 60);
                    const randomY = Math.random() * (window.innerHeight - 60);
                    const randomRotate = (Math.random() - 0.5) * 60;

                    word.classList.add('scattered');
                    word.style.position = 'fixed';
                    word.style.left = randomX + 'px';
                    word.style.top = randomY + 'px';
                    word.style.transform = `rotate(${randomRotate}deg)`;
                    word.style.opacity = '0.7';
                });
            };
            container.addEventListener('click', scatterAction);
            container.addEventListener('touchstart', scatterAction, { passive: false });
        }
    }
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('global-story-link').style.display = 'none';
    rippleEffect.active = false;
    document.getElementById('ripple-canvas').style.display = 'none';
}
const wheel = document.getElementById('wheel');
let isDragging = false;
let startAngle = 0;
let currentRotation = 0;
const totalRuins = 6;
const step = 360 / totalRuins;
function getAngle(x, y) {
    const rect = wheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
}
for (let i = 1; i <= totalRuins; i++) {
    const item = document.createElement('div');
    item.className = 'ruin-item';
    const rotateAngle = (360 / totalRuins) * (i - 1);
    item.style.setProperty('--item-rotate', `${rotateAngle}deg`);
    item.style.transform = `rotate(${rotateAngle}deg)`;
    const textSpan = document.createElement('span');
    textSpan.innerText = `Ruin ${i}`;
    textSpan.onclick = (e) => {
        e.stopPropagation();
        openOverlay(`ruin_${i}`);
    };
    item.appendChild(textSpan);
    wheel.appendChild(item);
}

wheel.addEventListener('mousedown', (e) => {
    isDragging = true;
    wheel.style.cursor = 'grabbing';
    wheel.style.transition = "none"; 
    startAngle = getAngle(e.clientX, e.clientY) - currentRotation;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const angle = getAngle(e.clientX, e.clientY);
    currentRotation = angle - startAngle;
    wheel.style.transform = `translate(-50%, 50%) rotate(${currentRotation}deg)`;
    updateActiveItem();
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    wheel.style.cursor = 'grab';
    const snapIndex = Math.round(currentRotation / step);
    currentRotation = snapIndex * step;
    wheel.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    wheel.style.transform = `translate(-50%, 50%) rotate(${currentRotation}deg)`;
    updateActiveItem();
});

function updateActiveItem() {
    const items = document.querySelectorAll('.ruin-item');
    const normalizedRotation = (360 - (currentRotation % 360)) % 360;
    const activeIndex = Math.round(normalizedRotation / step) % totalRuins;
    items.forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
    });
}
updateActiveItem();

wheel.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    startAngle = getAngle(touch.clientX, touch.clientY) - currentRotation;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const angle = getAngle(touch.clientX, touch.clientY);
    currentRotation = angle - startAngle;
    wheel.style.transform = `translate(-50%, 50%) rotate(${currentRotation}deg)`;
    updateActiveItem();
}, { passive: false });

window.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const snapIndex = Math.round(currentRotation / step);
    currentRotation = snapIndex * step;
    wheel.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    wheel.style.transform = `translate(-50%, 50%) rotate(${currentRotation}deg)`;
    updateActiveItem();
});

function sendComment() {
    const input = document.getElementById('msgInput');
    const list = document.getElementById('commentList');
    if (!input.value) return;

    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerText = input.value;
    list.prepend(div);
    input.value = '';

    setTimeout(() => {
        div.style.transition = 'opacity 3s ease';
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 3000);
    }, 5000);
}

let scratchCanvas, scratchCtx;

function initScratchEffect() {
    removeScratchEffect();
    scratchCanvas = document.createElement('canvas');
    scratchCanvas.id = 'scratch-container';
    document.getElementById('overlay').appendChild(scratchCanvas);
    scratchCtx = scratchCanvas.getContext('2d');

    const resize = () => {
        scratchCanvas.width = window.innerWidth;
        scratchCanvas.height = window.innerHeight;
        scratchCtx.fillStyle = '#000';
        scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMove = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        if (!x || !y) return;

        scratchCtx.save();
    
        const gradient = scratchCtx.createRadialGradient(x, y, 0, x, y, 60);
        gradient.addColorStop(0, 'rgba(177, 156, 217, 0.6)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.2)');
        gradient.addColorStop(1, 'transparent');
        
        scratchCtx.globalCompositeOperation = 'screen';
        scratchCtx.fillStyle = gradient;
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, 60, 0, Math.PI * 2);
        scratchCtx.fill();
        scratchCtx.globalCompositeOperation = 'destination-out';
        const eraserGradient = scratchCtx.createRadialGradient(x, y, 0, x, y, 45);
        eraserGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        eraserGradient.addColorStop(1, 'transparent');
        
        scratchCtx.fillStyle = eraserGradient;
        scratchCtx.beginPath();
        scratchCtx.arc(x, y, 45, 0, Math.PI * 2);
        scratchCtx.fill();

        scratchCtx.restore();
    };

    scratchCanvas.addEventListener('mousemove', handleMove);
    scratchCanvas.addEventListener('touchmove', handleMove, { passive: false });
}
function removeScratchEffect() {
    const canvas = document.getElementById('scratch-container');
    if (canvas) canvas.remove();
}