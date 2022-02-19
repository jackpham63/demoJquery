$(document).ready(function () {
  var callData = new CallData();
  var listChosen = new ListChosen();
  renderHTML();
  function renderHTML() {
    callData
      .getListData()
      .done(function (result) {
        console.log(result);
        var contentNavPills = "";
        var contentTabPane = "";
        result.navPills.forEach(function (item, index) {
          var activeClass = item.tabName === "tabHonda" ? "active" : "";
          var fadeClass = item.tabName !== "tabHonda" ? "fade" : "";
          contentNavPills += `
          <li class="nav-item">
              <a
                class="nav-link ${activeClass} btn-default"
                data-toggle="pill"
                href="#${item.tabName}"
                >${item.showName}</a
              >
            </li>
          `;
          contentTabPane += `
            <div class="tab-pane container ${fadeClass} ${activeClass}" id="${
            item.tabName
          }">
            <div class="row">
                ${renderTabPane(item.tabName, result.tabPanes)}
            </div>
            </div>
          `;
        });
        $(".nav-pills").html(contentNavPills);
        $(".tab-content").html(contentTabPane);
      })
      .fail(function (err) {
        console.log(err);
      });
  }
  function getTypeArr(tabType, data) {
    var tempArr = [];
    data.forEach(function (item) {
      if (item.type === tabType) {
        tempArr.push(item);
      }
    });
    return tempArr;
  }
  function getElmItem(tempArr) {
    var elmItem = "";
    tempArr.forEach(function (item) {
      elmItem += `
         <div class="col-md-3">
            <div class="card text-center">
            <img src="${item.imgSrc_jpg}"/>
            <h4><b>${item.name}</b></h4>
            <button data-id="${item.id}" data-type=${item.type} data-name=${item.name} data-desc=${item.desc} data-imgsrcjpg=${item.imgSrc_jpg} data-imgsrcpng=${item.imgSrc_png}  class="changeStyle">Demo</button>
            </div>
          </div>
      `;
    });
    return elmItem;
  }
  function renderTabPane(tabName, arrTabPane) {
    var temArr = null;
    var elmItem = null;
    switch (tabName) {
      case "tabHonda":
        temArr = getTypeArr("hondas", arrTabPane);
        // console.log(temArr);
        elmItem = getElmItem(temArr);
        break;
      case "tabYamaha":
        temArr = getTypeArr("yamahas", arrTabPane);
        elmItem = getElmItem(temArr);
        break;
      case "tabBackground":
        temArr = getTypeArr("backgrounds", arrTabPane);
        elmItem = getElmItem(temArr);
        break;
      default:
        break;
    }
    return elmItem;
  }
  // $(".changeStyle").click(function () {
  //   console.log(ahihiTest);
  // });
  function findIndex(type) {
    var index = -1;
    if (listChosen.arr && listChosen.arr.length > 0) {
      listChosen.arr.forEach(function (item, i) {
        if (item.type === type) {
          index = i;
        }
      });
    }
    return index;
  }
  $("body").delegate(".changeStyle", "click", function () {
    // console.log(test02);
    var id = $(this).data("id");
    var type = $(this).data("type");
    var name = $(this).data("name");
    var desc = $(this).data("desc");
    var imgsrc_jpg = $(this).data("imgsrcjpg");
    var imgsrc_png = $(this).data("imgsrcpng");

    var chooseItem = new ChooseItem(
      id,
      type,
      name,
      desc,
      imgsrc_jpg,
      imgsrc_png
    );
    // console.log(chooseItem);
    var index = findIndex(chooseItem.type);
    if (index !== -1) {
      listChosen.arr[index] = chooseItem;
    } else {
      listChosen.addItem(chooseItem);
    }
    // listChosen.addItem(chooseItem);
    console.log(listChosen.arr);
    renderXe(listChosen.arr);
  });
  function renderXe(chosenItems) {
    if (chosenItems && chosenItems.length > 0) {
      console.log(chosenItems);
      chosenItems.forEach(function (item) {
        if (item.type === "hondas") {
          renderMid(item.imgsrc_png);
        }
        if (item.type === "yamahas") {
          renderBelow(item.imgsrc_png);
        }
        if (item.type === "backgrounds") {
          renderBackground(item.imgsrc_png);
        }
      });
    }
    function renderMid(img) {
      $(".OnTheMid").css({
        width: "800px",
        height: "700px",
        background: `url(${img})`,
        backgroundRepeat: "no-repeat",
        position: "absolute",
        bottom: "-50%",
        right: "-35%",
        transform: "scale(0.5)",
        zIndex: "4",
      });
      // $(".OnTheMid").css
    }
    function renderBelow(img) {
      $(".OnTheBelow").css({
        width: "800px",
        height: "700px",
        background: `url(${img})`,
        backgroundRepeat: "no-repeat",
        position: "absolute",
        bottom: "-80%",
        right: "-75%",
        transform: "scale(0.5)",
        zIndex: "4",
      });
      // $(".OnTheMid").css
    }
    function renderBackground(img) {
      $(".OnBackground").css({
        backgroundImage: `url(${img})`,
      });
    }
  }
});
