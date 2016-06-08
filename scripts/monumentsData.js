var objects = [];

   function createPoint(name, position, description, url) {
       var result = Object.create(null);

       result.name = name;
       result.position = position;
       result.description = description;
       result.url = url;

       objects.push(result);

   }
    createPoint('Fontanna Neptuna',[54.3486247,18.5830179],"opis","images/neptun.jpg");
    console.log (objects);


