    window.addEventListener("load", async function(){
        document.getElementById('loading').style.backgroundColor = 'transparent';
      await new Promise(r => setTimeout(r, 700));
      document.getElementById('loading').style.display = 'none';
    });
    window.addEventListener("scroll", function(){
        if (window.scrollY > 30) {
            document.getElementById('bar').style.backgroundColor = "#444444";
          document.getElementById('bar').style.padding = "0.1%";
          document.getElementById('bar').style.width = "99.8%";
          document.getElementById('title').style.fontSize = "200%";
        } else {
            document.getElementById('bar').style.backgroundColor = "#000000";
          document.getElementById('bar').style.padding = "1%";
          document.getElementById('bar').style.width = "98%";
          document.getElementById('title').style.fontSize = "400%";
        }
    });