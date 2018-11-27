$(document).ready(function () {

  var source = $("#carousel-template").html();
 
  var template = Handlebars.compile(source);
  
  var carousel = $("#carouselDiv")

  var listSource = $("#listView-template").html();
  console.log(listSource)
  var listTemplate = Handlebars.compile(listSource)
  var accordion = $("#accordion")

  $("#listDiv").hide()

    listEventsRef.get().then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      doc.data().id = doc.id
      let copyObj = JSON.parse(JSON.stringify(doc.data()));
      copyObj.id = "number" + index
      console.log(copyObj)

      var listString = listTemplate(copyObj)
      accordion.append(listString)

      $(".btn-link").onclick = function (num) {
        console.log("clicked on an accordion card")
         $("this").collapse()
      }(index)
    })
  })

  carouselEventsRef.get().then(snapshot => {
    
    snapshot.docs.forEach((doc, index) => {
      
     
      /* doc.data().id = doc.id
      let copyObj = JSON.parse(JSON.stringify(doc.data()));
      copyObj.id = "number" + index
      console.log(copyObj) */
      
      var string = template(doc.data());
     /*  var listString = listTemplate(copyObj)
      accordion.append(listString) */
      carousel.append(string);
     

      $("#detailsBtn").onclick = function (num) {
        $('[data-toggle="popover"]').popover({
          container: "#carouselDiv"
        });

        $(".popover-dismiss").popover({
          trigger: "focus"
        });
        
        
      }(index);

    /*   $(".btn-link").onclick = function (num) {
        console.log("clicked on an accordion card")
         $("this").collapse()
      }(index)
 */
    });
  });

  $(".navbar-toggler").on("click", function () {
    $(".animated-icon").toggleClass("open");
  });


  $('.carousel').carousel({
    interval: false
  })

  $('[data-toggle="popover"]').popover({
    container: "#carouselDiv"
  });

  $(".popover-dismiss").popover({
    trigger: "focus"
  });

  $("#toggleBtn").on("click", function (event) {
    console.log('clicked on toggle');
    event.preventDefault();
    $(".main-body").toggleClass("listView");
    if ($(".main-body").hasClass("listView")) {
      $(".main-body").hide()
      $("#listDiv").show()
      $("#toggleBtn").text("See Carousel")
    } else {
      $("#toggleBtn").text("See List View")
      $(".main-body").show()
      $("#listDiv").hide()

      console.log("no list")
    }
  });



})