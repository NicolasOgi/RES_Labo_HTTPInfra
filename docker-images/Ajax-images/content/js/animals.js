$(function(){
    function loadAnimals(){
      $.getJSON("/api/animals/", function(animals){
        const message = animals[0].type +" for only "+animals[0].price;
        $(".animals").text(message);
      });
    }
    loadAnimals();
    setInterval(loadAnimals, 2000);
});
