const tastes = [
    {
        image: require('../assets/tastes/1.png'),
        name: 'Salzburger Nockerl',
        description: 'A light, airy dessert similar to a soufflé, with a vanilla flavor, traditionally served with powdered sugar.',
        ingredients: '6 eggs, 100g sugar, 1 tbsp vanilla sugar, 100g flour, 200g cream, a pinch of salt.',
        preparation: 'Whisk egg whites with sugar until stiff peaks form, add vanilla, and mix with flour and cream. Place the mixture in a baking dish and bake at 180°C (350°F) for 10-15 minutes until golden.',
        history: 'Salzburger Nockerl is a dessert as light and airy as the snow-covered peaks of the Alps that surround Salzburg, and it’s an iconic symbol of the city. This fluffy soufflé-like dessert has a story that dates back to the 17th century when it was created as a tribute to the majestic mountain landscape. Legend has it that the dessert was inspired by the three peaks of the Untersberg mountain, which rise dramatically above the city of Salzburg, resembling clouds over the snowy landscape. In the 19th century, Salzburger Nockerl became a favorite among aristocrats and royal families, who would savor it in the elegant coffeehouses of Salzburg, especially after enjoying a hearty meal. The delicate texture, created by whipped egg whites, became a defining feature of Austrian desserts and remained a beloved treat through the centuries. The dish`s history is also intertwined with Salzburg’s identity as a cultural hub of classical music. The sweet, airy nature of the dessert evokes the same delicacy and refinement as the city’s famous composer, Wolfgang Amadeus Mozart. It’s said that the Nockerl was popular at musical gatherings and feasts during the Baroque and Classical periods.',
        complete: 'Bravo! Your Salzburger Nockerl is as light and elegant as the city itself.'
    },
    {
        image: require('../assets/tastes/2.png'),
        name: 'Zellertal Apple Strudel',
        description: 'A classic Austrian dessert with apples, cinnamon, and raisins wrapped in a crisp pastry.',
        ingredients: '2 apples, 100g sugar, 1 tsp cinnamon, 200g strudel dough, 50g butter.',
        preparation: 'Slice the apples and mix with sugar, cinnamon, and raisins. Roll out the dough, fill with the mixture, and roll up into a strudel. Bake at 180°C (350°F) until golden.',
        history: 'Apple strudel, one of the most famous dishes in Austrian cuisine, is closely tied to the history of Salzburg. Zellertaler Apfelstrudel, named after the Zellertal valley, is a unique variation that has its roots in the heart of Salzburg’s countryside. The dish is rich in history, evolving over the centuries as a humble yet cherished comfort food. The origins of apple strudel trace back to the Ottoman Empire, where the dish began as a sweet pastry wrapped around spiced fruit. When the Austrians encountered it during the late 17th century, they adapted it, adding local ingredients such as apples, which were abundantly grown in the Zellertal region. By the 18th century, strudel had become a fixture in Austrian bakeries, and the Zellertaler version, with its specific combination of apples, cinnamon, and raisins, gained a particular following among local villagers. The Zellertaler Apfelstrudel became known for its slightly firmer, more rustic texture, in contrast to the lighter versions popular in Vienna. It was often served in the idyllic alpine inns and mountain huts that dotted the region, providing sustenance to travelers and locals alike. Today, this dish remains a favorite during the autumn months when apples are harvested, and it is enjoyed by both locals and tourists, who savor the sweet, flaky pastry as they take in the stunning beauty of the valley.',
        complete: 'A slice of tradition is now on your plate. Zellertal would be proud!'
    },
    {
        image: require('../assets/tastes/3.png'),
        name: 'Viennese Schnitzel',
        description: 'A breaded and fried veal cutlet, traditionally served with potato salad or mashed potatoes.',
        ingredients: '4 veal cutlets, 2 eggs, 100g breadcrumbs, 50g butter for frying.',
        preparation: 'Dredge the meat in flour, dip in beaten egg, and coat in breadcrumbs. Fry in hot butter until golden brown.',
        history: 'Wiener Schnitzel, one of Austria’s most beloved dishes, is not just a culinary tradition, but a symbol of Austrian identity. While it’s most closely associated with Vienna, the dish has deep historical ties to the entire Austrian Empire, including Salzburg. The origins of the Wiener Schnitzel go back to the 19th century, though it is believed to have roots even earlier in Italy, where a similar dish known as “cotoletta alla milanese” was prepared. The dish came to Austria when the elite in the Austro-Hungarian Empire were exposed to Italian cuisine, especially during the Napoleonic wars. It wasn’t until the 18th century that it gained popularity in Vienna, where it became a staple in the grand imperial courts. Its rise to fame was bolstered by its association with the aristocracy, who would enjoy the delicately fried veal cutlets as part of lavish meals in their palatial dining rooms. In Salzburg, Wiener Schnitzel took on a local flavor. While the traditional veal version remained the standard, variations emerged, incorporating different types of meat such as pork. The dish also became a popular street food, served in cozy alpine taverns and bustling restaurants. Today, Wiener Schnitzel is a must-try for anyone visiting Salzburg, offering a taste of both history and tradition.',
        complete: 'Crispy, golden, and oh-so-perfect—your Wiener Schnitzel is a true taste of Austria!'
    },
    {
        image: require('../assets/tastes/4.png'),
        name: 'Kasnocken - Cheese Noodles',
        description: 'Potato dumplings with cheese, served with fried onions and bacon.',
        ingredients: '500g mashed potatoes, 100g cheese, 2 eggs, 200g flour, 1 onion, 50g bacon.',
        preparation: 'Mix the mashed potatoes with eggs, flour, and cheese. Shape into dumplings and boil them. Serve with fried onions and bacon.',
        history: 'Kasnocken, or Austrian cheese dumplings, are a quintessential dish in the mountainous regions of Salzburg, where hearty, satisfying meals are needed to fuel those who spend their days exploring the alpine trails. This dish is a variation of the well-known “Käsespätzle,” but it has a more distinct, rustic touch. The dish originates from the alpine huts and villages, where the locals would prepare it using fresh cheese from the surrounding dairy farms. The cheese used in Kasnocken is often a local variety, such as “Tyrolean mountain cheese,” giving the dish its signature rich, creamy flavor. It is said that the dish was prepared by farmers and herders as a way to make use of the surplus of cheese produced in the area, offering a filling meal after a long day of work on the mountainside. Kasnocken quickly became popular in Salzburg, particularly in the winter months, when the snow-covered landscape made skiing and snowboarding an annual tradition. Served with crispy onions and bacon, the dish became a symbol of comfort and sustenance in the cold, harsh Alpine winters. Today, it’s commonly enjoyed in local mountain inns and restaurants, where it’s paired with a glass of locally brewed beer or a hearty Austrian wine.',
        complete: 'One bite of your Kasnocken, and it’s like a warm hug from Salzburg itself!'
    },
    {
        image: require('../assets/tastes/5.png'),
        name: 'Emperor’s Pancake',
        description: 'A fluffy, sweet pancake served with jam or apples.',
        ingredients: '4 eggs, 150g flour, 250ml milk, 50g sugar, 1 tsp vanilla sugar, raisins, powdered sugar.',
        preparation: 'Beat the eggs, milk, flour, vanilla, and sugar into a smooth batter. Fry in a pan until golden, then tear into pieces and dust with powdered sugar.',
        history: 'Kaiserschmarrn is one of Austria’s most famous and beloved desserts, and its history is tied to the country’s imperial past. The name “Kaiserschmarrn” means “Emperor’s pancake,” and the dish was supposedly a favorite of Emperor Franz Joseph I of Austria, who was known for his love of simple but hearty foods. Legend has it that the dish was accidentally created when Franz Joseph’s royal kitchen made a mistake while preparing a pancake. The pancake was overcooked and torn apart, but the emperor, impressed by the taste, ordered it to be served regularly at his court. The dish was soon named after him and became a symbol of imperial Austria. Kaiserschmarrn is traditionally made by whisking eggs, flour, and milk into a batter, frying it in butter until golden, and then tearing it into pieces, dusting it with powdered sugar, and serving it with fruit compote, often of plums or apples. The sweet, fluffy pancake became a staple in Austrian homes and inns, offering a comforting end to a delicious meal. The dish’s history also reflects the Austro-Hungarian Empire’s unique cultural blend. While the Kaiserschmarrn was originally a simple, rustic dish, it evolved into a refined dessert that could be enjoyed in both grand palaces and humble alpine villages. It remains a beloved treat in Salzburg today, often found in local cafes and eateries, where tourists and locals alike indulge in its sweet, comforting flavors.',
        complete: 'Every forkful tells a story of imperial feasts and Alpine coziness—great work!'
    },
];

export default tastes;