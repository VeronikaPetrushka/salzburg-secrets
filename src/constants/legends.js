const legends = [
    {
        image: require('../assets/legends/1.png'),
        topic: "Hidden Gems of Salzburg",
        statements: [
            {
                statement: "The Steingasse is a hidden street filled with historic charm.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "St. Peter’s Cemetery is one of Salzburg’s least visited places.",
                options: ["True", "False"],
                correctOption: "False"
            },
            {
                statement: "Müllner Steg bridge offers the best view of Salzburg’s skyline.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "The Hellbrunn Trick Fountains are a hidden feature of the palace gardens.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "Kapuzinerberg is inaccessible to hikers.",
                options: ["True", "False"],
                correctOption: "False"
            },
            {
                statement: "Augustiner Bräu monastery is a little-known brewery in Salzburg.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "The old town (Altstadt) is not part of Salzburg’s hidden treasures.",
                options: ["True", "False"],
                correctOption: "False"
            },
            {
                statement: "The Waterfall Garden is a secret oasis within Salzburg.",
                options: ["True", "False"],
                correctOption: "False"
            },
            {
                statement: "The Nonnberg Abbey is known for its ties to The Sound of Music.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "The Hangar-7 building houses vintage aircraft and fine dining.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "There is a tunnel system under Salzburg Castle.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "The Leopoldskron Palace is a public tourist site.",
                options: ["True", "False"],
                correctOption: "False"
            },
            {
                statement: "The Salzburg Cathedral Museum is free to visit every Sunday.",
                options: ["True", "False"],
                correctOption: "False"
            },
            {
                statement: "Monchsberg’s cliffside elevator is a hidden access point to the city.",
                options: ["True", "False"],
                correctOption: "True"
            },
            {
                statement: "There’s a library in Salzburg exclusively for books about Mozart.",
                options: ["True", "False"],
                correctOption: "True"
            }
        ]
    },
    {
        image: require('../assets/legends/2.png'),
        topic: "Salzburg’s Architecture",
        statements: [
            { statement: "Salzburg’s Altstadt is a UNESCO World Heritage Site.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Mirabell Palace is known for its Baroque design.", options: ["True", "False"], correctOption: "True" },
            { statement: "Fortress Hohensalzburg is the smallest medieval castle in Austria.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Salzburg Cathedral was originally built in the Romanesque style.", options: ["True", "False"], correctOption: "True" },
            { statement: "Mozart’s birthplace has remained architecturally unchanged for centuries.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Residenzplatz fountain is the oldest in Austria.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Kollegienkirche is a Baroque masterpiece by Johann Bernhard Fischer von Erlach.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Old Market Square features Renaissance architecture.", options: ["True", "False"], correctOption: "False" },
            { statement: "Schloss Hellbrunn is known for its Rococo style.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Mönchsberg fortifications date back to the 14th century.", options: ["True", "False"], correctOption: "True" },
            { statement: "Salzburg’s churches are predominantly Gothic in style.", options: ["True", "False"], correctOption: "False" },
            { statement: "Schloss Leopoldskron served as a model for The Sound of Music.", options: ["True", "False"], correctOption: "True" },
            { statement: "Salzburg’s modern architecture contrasts heavily with its old town.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Glockenspiel Tower has 35 bells that chime every hour.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Franziskaner Church is located outside the city center.", options: ["True", "False"], correctOption: "False" },
        ]
    },
    {
        image: require('../assets/legends/3.png'),
        topic: "Legends and Myths of Salzburg",
        statements: [
            { statement: "The Devil’s Stone legend is tied to the Salzburg Cathedral.", options: ["True", "False"], correctOption: "True" },
            { statement: "A dragon once lived in the caves of Mönchsberg.", options: ["True", "False"], correctOption: "True" },
            { statement: "Nonnberg Abbey is said to be haunted by a former abbess.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Salzach River was named after a mythical creature.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Fortress Hohensalzburg was built to protect the city from ghosts.", options: ["True", "False"], correctOption: "False" },
            { statement: "A local myth claims that St. Peter’s Cemetery has a hidden treasure.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Kapuzinerberg Monastery is rumored to have underground tunnels.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Mirabell Gardens were inspired by a magical fairy tale.", options: ["True", "False"], correctOption: "False" },
            { statement: "The trick fountains at Hellbrunn Palace are said to be cursed.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Salzburg Witch Trials took place during the 17th century.", options: ["True", "False"], correctOption: "True" },
            { statement: "A local legend states that Mozart’s spirit roams the streets.", options: ["True", "False"], correctOption: "False" },
            { statement: "There’s a story about a golden salamander hidden in Salzburg.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Residenz Fountain is believed to grant wishes during full moons.", options: ["True", "False"], correctOption: "True" },
            { statement: "Salzburg’s bells are said to sing hymns on Christmas Eve.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Silent Night song was inspired by a miraculous event in the city.", options: ["True", "False"], correctOption: "True" },
        ]
    },
    {
        image: require('../assets/legends/4.png'),
        topic: "Salzburg During Different Eras",
        statements: [
            { statement: "Salzburg was once part of the Roman Empire.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Prince-Archbishops ruled Salzburg until the 19th century.", options: ["True", "False"], correctOption: "True" },
            { statement: "During World War II, Salzburg’s Altstadt was completely destroyed.", options: ["True", "False"], correctOption: "False" },
            { statement: "Salzburg became part of Austria in 1803.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Hohensalzburg Fortress was never captured in battle.", options: ["True", "False"], correctOption: "True" },
            { statement: "Mozart lived in Salzburg during the late Baroque period.", options: ["True", "False"], correctOption: "True" },
            { statement: "Salzburg was a significant trading hub in the Middle Ages.", options: ["True", "False"], correctOption: "True" },
            { statement: "The first Salzburg Festival was held in 1945.", options: ["True", "False"], correctOption: "False" },
            { statement: "The city was once governed by a coalition of neighboring countries.", options: ["True", "False"], correctOption: "False" },
            { statement: "During the Renaissance, Salzburg was known for its musical innovation.", options: ["True", "False"], correctOption: "True" },
            { statement: "The city gained independence from Bavaria in the 14th century.", options: ["True", "False"], correctOption: "False" },
            { statement: "Salzburg was bombed during World War II, but many landmarks survived.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Mirabell Palace was a gift from a Prince-Archbishop to his wife.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Silent Night Chapel was built in the 18th century.", options: ["True", "False"], correctOption: "False" },
            { statement: "Salzburg’s salt trade made it one of Europe’s wealthiest cities.", options: ["True", "False"], correctOption: "True" },
        ]
    },
    {
        image: require('../assets/legends/5.png'),
        topic: "Salzburg’s Unique Landmarks",
        statements: [
            { statement: "The Hohensalzburg Fortress is the largest fully preserved castle in Central Europe.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Salzburg Cathedral has a crypt open to visitors.", options: ["True", "False"], correctOption: "True" },
            { statement: "Schloss Mirabell is closed to tourists year-round.", options: ["True", "False"], correctOption: "False" },
            { statement: "St. Peter’s Cemetery inspired some scenes in The Sound of Music.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Kapuzinerberg offers a panoramic view of Salzburg.", options: ["True", "False"], correctOption: "True" },
            { statement: "Salzburg Museum is housed in a medieval fortress.", options: ["True", "False"], correctOption: "False" },
            { statement: "The Getreidegasse is known for its historic wrought-iron signs.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Residenz Fountain is in the center of Mozart Square.", options: ["True", "False"], correctOption: "False" },
            { statement: "Schloss Hellbrunn has a theater inside the palace.", options: ["True", "False"], correctOption: "False" },
            { statement: "Hangar-7 houses a collection of historical planes and cars.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Mozart Birthplace Museum is in a 17th-century house.", options: ["True", "False"], correctOption: "True" },
            { statement: "Nonnberg Abbey is the oldest convent north of the Alps.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Untersberg Mountain is accessible via a funicular railway.", options: ["True", "False"], correctOption: "False" },
            { statement: "Salzburg Zoo is located at the foot of the Hellbrunn Mountain.", options: ["True", "False"], correctOption: "True" },
            { statement: "The Glockenspiel Tower chimes daily at noon.", options: ["True", "False"], correctOption: "True" },
        ]
    },
];

export default legends;

export const lose = [
    {
        title: 'Birthplace of Mozart',
        description: 'Salzburg is internationally renowned as the birthplace of Wolfgang Amadeus Mozart, one of history’s greatest composers. Born on January 27, 1756, in a house now known as “Mozart’s Birthplace” (Mozart Geburtshaus), it has become a museum where visitors can explore his early life, family, and musical genius. The city’s dedication to Mozart is celebrated annually through festivals, performances, and tributes.'
    },
    {
        title: 'A UNESCO World Heritage Site',
        description: 'Salzburg’s historic center was designated a UNESCO World Heritage Site in 1996. The city boasts remarkable baroque architecture, charming alleyways, and picturesque squares. Highlights include the Residenz Palace, Salzburg Cathedral, and St. Peter’s Abbey. Its well-preserved architecture offers a journey back in time.'
    },
    {
        title: 'The Sound of Music Connection',
        description: 'Salzburg is synonymous with The Sound of Music, the iconic film starring Julie Andrews. Visitors can take guided tours to explore key filming locations, including Mirabell Gardens, Leopoldskron Palace, and Nonnberg Abbey. The film has drawn fans from around the world, making it a cornerstone of Salzburg tourism.'
    },
    {
        title: 'Festivals Galore',
        description: 'Salzburg is known as the “Stage of the World” thanks to its vibrant festival scene. The Salzburg Festival, established in 1920, is a world-class event featuring opera, drama, and classical music. Held every summer, it attracts top-tier performers and audiences who come to revel in the city’s cultural offerings.'
    },
    {
        title: 'Fortress Hohensalzburg',
        description: 'One of Europe’s largest and best-preserved medieval castles, Fortress Hohensalzburg, looms above the city on Festungsberg Hill. Built in 1077, it served as a military stronghold and a residence for Salzburg’s archbishops. Today, it offers stunning views, a fascinating museum, and a glimpse into the region’s history.'
    },
    {
        title: 'Culinary Heritage',
        description: 'Salzburg’s culinary scene reflects its rich history and culture. Local specialties like Salzburger Nockerl (a sweet soufflé), Kasnocken (cheese dumplings), and Mozartkugeln (chocolate pralines) delight food lovers. The city also has a strong café culture, with establishments like Café Tomaselli, a favorite of Mozart.'
    },
    {
        title: 'Salzach River',
        description: 'The Salzach River flows through Salzburg, offering scenic beauty and recreational opportunities. It historically served as an important trade route for the region’s salt exports, giving the city its name (Salz = salt). Today, river cruises and promenades along its banks are popular activities for locals and tourists alike.'
    },
    {
        title: 'Natural Surroundings',
        description: 'Salzburg is a gateway to some of Austria’s most breathtaking landscapes. Just a short drive from the city, visitors can explore the Untersberg Mountain, Werfen Ice Caves (Eisriesenwelt), and Lake Wolfgang. In winter, Salzburg becomes a hub for skiing and snowboarding enthusiasts heading to nearby Alpine resorts.'
    },
    {
        title: 'A City of Music Beyond Mozart',
        description: 'Salzburg’s rich musical heritage extends beyond Mozart. The city nurtures a strong choral and orchestral tradition, with institutions like the Mozarteum and the Salzburg Philharmonic. Concerts and musical events take place year-round, cementing its reputation as a global music capital.'
    },
    {
        title: 'St. Peter’s Cemetery and Catacombs',
        description: 'One of the most beautiful and historic cemeteries in Europe, St. Peter’s Cemetery, dates back to the early Christian era. Its ornate tombstones, flower-covered graves, and rock-cut catacombs create an enchanting and reflective atmosphere. It’s also a filming location for The Sound of Music.'
    },
];

