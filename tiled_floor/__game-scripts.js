var MaterialChanger = pc.createScript("materialChanger");
MaterialChanger.attributes.add("materials", {
  type: "asset",
  assetType: "material",
  array: !0,
}),
  (MaterialChanger.prototype.initialize = function () {
    var e = this;
    if (
      ((this.planeEntity = this.app.root.findByName("Plane")), this.planeEntity)
    ) {
      (this.buttonContainer = document.createElement("div")),
        this.buttonContainer.classList.add("button-container"),
        (this.buttonContainer.style.position = "absolute"),
        (this.buttonContainer.style.display = "flex"),
        (this.buttonContainer.style.gap = "10px"),
        (this.buttonContainer.style.flexDirection = "column"),
        document.body.appendChild(this.buttonContainer),
        this.materials.forEach((t, a) => {
          var n = document.createElement("button");
          (n.style.borderRadius = "5px"),
            (n.style.border = "1px solid #333"),
            (n.style.width = "200px"),
            (n.style.padding = "5px");
          var i = document.createElement("div"),
            r = document.createElement("h5");
          r.innerText = t.name;
          var o = document.createElement("ul");
          if (
            (t.tags._list.map((e) => {
              o.innerHTML += `<li><a>${e}</a></li>`;
            }),
            t.resource && t.resource.diffuseMap)
          ) {
            var l = t.resource.diffuseMap.getSource();
            if (l) {
              var s = document.createElement("canvas"),
                h = s.getContext("2d");
              (s.width = l.width),
                (s.height = l.height),
                h.drawImage(l, 0, 0),
                (s.style.borderRadius = "5px"),
                n.appendChild(s);
            } else console.log("❌ Không thể lấy ảnh từ texture!");
          } else n.textContent = t.name || `Material ${a + 1}`;
          n.addEventListener("click", function () {
            e.saveMaterial(a), e.changeMaterial(a);
          }),
            i.appendChild(r),
            i.appendChild(o),
            n.appendChild(i),
            this.buttonContainer.appendChild(n);
        });
      var t = this.getPlaneSizeFromRender();
      t &&
        (console.log("Chiều rộng:", t.width),
        console.log("Chiều dài:", t.height));
    } else console.log("❌ Không tìm thấy entity 'Plane'!");
  }),
  (MaterialChanger.prototype.update = function (e) {}),
  (MaterialChanger.prototype.saveMaterial = function (e) {
    this.savedMaterialIndex = e;
  }),
  (MaterialChanger.prototype.changeMaterial = function (e) {
    if (this.planeEntity && this.materials[e]) {
      var t = this.planeEntity.render;
      t
        ? ((t.material = this.materials[e].resource),
          this.app.fire(
            "show:notification",
            "Đã áp dụng: " + this.materials[e].name
          ))
        : console.log("❌ Entity 'Plane' không có Render Component!");
    } else console.log("❌ Không tìm thấy Material hoặc Plane!");
  }),
  (MaterialChanger.prototype.loadSavedMaterial = function () {
    void 0 !== this.savedMaterialIndex &&
      this.materials[this.savedMaterialIndex] &&
      (this.changeMaterial(this.savedMaterialIndex),
      console.log(
        `Tải lại material: ${this.materials[this.savedMaterialIndex].name}`
      ));
  }),
  (MaterialChanger.prototype.getPlaneSizeFromRender = function () {
    var e = this.planeEntity.render;
    if (e && e.meshInstances.length > 0) {
      var t = e.meshInstances[0].aabb,
        a = 2 * t.halfExtents.x,
        n = 2 * t.halfExtents.z;
      return (
        console.log("Chiều rộng của Plane từ Render Component:", a),
        console.log("Chiều dài của Plane từ Render Component:", n),
        { width: a, height: n }
      );
    }
    return (
      console.error("❌ Không thể tìm thấy Mesh hoặc Render Component!"), null
    );
  });
var NotificationSystem = pc.createScript("notificationSystem");
NotificationSystem.attributes.add("maxNotifications", {
  type: "number",
  default: 3,
  title: "Max Notifications",
}),
  (NotificationSystem.prototype.initialize = function () {
    (this.notifications = []),
      (this.container = document.createElement("div")),
      (this.container.style.position = "fixed"),
      (this.container.style.top = "30px"),
      (this.container.style.left = "50%"),
      (this.container.style.transform = "translateX(-50%)"),
      (this.container.style.width = "300px"),
      (this.container.style.display = "flex"),
      (this.container.style.flexDirection = "column-reverse"),
      (this.container.style.gap = "10px"),
      (this.container.style.zIndex = "1000"),
      document.body.appendChild(this.container);
    var t = this;
    this.app.on("show:notification", function (i) {
      t.addNotification(i);
    });
  }),
  (NotificationSystem.prototype.update = function (t) {}),
  (NotificationSystem.prototype.addNotification = function (t) {
    var i = document.createElement("div");
    (i.style.background = "#ffff"),
      (i.style.color = "#000000"),
      (i.style.padding = "15px"),
      (i.style.borderRadius = "5px"),
      (i.style.boxShadow = "0px 5px 10px rgba(0,0,0,0.2)"),
      (i.style.fontSize = "14px"),
      (i.style.opacity = "0"),
      (i.style.transform = "translateY(-30px)"),
      (i.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out"),
      (i.innerText = "✅ " + t),
      this.container.appendChild(i),
      this.notifications.push(i),
      setTimeout(() => {
        (i.style.transform = "translateY(0px)"), (i.style.opacity = "1");
      }, 10);
    var o = this;
    setTimeout(function () {
      o.removeNotification(i);
    }, 3e3);
  }),
  (NotificationSystem.prototype.removeNotification = function (t) {
    (t.style.opacity = "0"),
      (t.style.transform = "translateY(-30px)"),
      setTimeout(() => {
        this.container.removeChild(t),
          this.notifications.shift(),
          this.repositionNotifications();
      }, 300);
  }),
  (NotificationSystem.prototype.repositionNotifications = function () {
    this.notifications.forEach((t, i) => {
      t.style.transform = `translateY(${40 * i}px)`;
    });
  });
var TiledFloor = pc.createScript("tiledFloor");
TiledFloor.attributes.add("TiledByMaterial", {
  type: "asset",
  assetType: "material",
}),
  (TiledFloor.prototype.initialize = function () {}),
  (TiledFloor.prototype.update = function (e) {});
var MaterialDatabase = pc.createScript("materialDatabase");
MaterialDatabase.attributes.add("materials", {
  type: "asset",
  assetType: "material",
  array: !0,
  title: "Materials",
}),
  MaterialDatabase.attributes.add("materialNames", {
    type: "string",
    array: !0,
    title: "Material Names",
  }),
  MaterialDatabase.attributes.add("materialSizes", {
    type: "string",
    array: !0,
    title: "Material Sizes",
  }),
  MaterialDatabase.attributes.add("materialTypes", {
    type: "string",
    array: !0,
    title: "Material Types",
  }),
  (MaterialDatabase.prototype.getMaterialList = function () {
    for (var a = [], t = 0; t < this.materials.length; t++)
      a.push({
        material: this.materials[t],
        name: this.materialNames[t] || `Material ${t + 1}`,
        size: this.materialSizes[t] || "Unknown Size",
        type: this.materialTypes[t] || "Unknown Type",
      });
    return a;
  }),
  (MaterialDatabase.prototype.logMaterials = function () {
    var a = this.getMaterialList();
    console.log("📜 Danh sách Material:", a);
  });
var MaterialForm = pc.createScript("materialForm");
(MaterialForm.prototype.initialize = function () {
  this.createForm();
}),
  (MaterialForm.prototype.createForm = function () {
    var e = document.createElement("div");
    (e.innerHTML =
      '\n        <div id="material-form" style="position: fixed; top: 20px; left: 20px; background: white; padding: 10px; border-radius: 5px;">\n            <h3>Thêm Material</h3>\n            <label>Tên: <input type="text" id="material-name"></label><br>\n            <label>Kích thước: <input type="text" id="material-size"></label><br>\n            <label>Loại: <input type="text" id="material-type"></label><br>\n            <label>Texture: <input type="file" id="material-texture"></label><br>\n            <button id="save-material">Lưu</button>\n        </div>'),
      document.body.appendChild(e),
      document
        .getElementById("save-material")
        .addEventListener("click", () => this.saveMaterial());
  }),
  (MaterialForm.prototype.saveMaterial = function () {
    var e = document.getElementById("material-name").value,
      t =
        (document.getElementById("material-size").value,
        document.getElementById("material-type").value,
        document.getElementById("material-texture").files[0]);
    if (e && t) {
      var a = this,
        r = new FileReader();
      (r.onload = function (r) {
        var i = new Image();
        (i.onload = function () {
          var r = new pc.Texture(a.app.graphicsDevice, {
            format: pc.PIXELFORMAT_R8_G8_B8_A8,
            autoMipmap: !0,
          });
          r.setSource(i);
          var n = new pc.Asset(e + "-texture", "texture", { url: t.name });
          (n.resource = r),
            a.app.assets.add(n),
            n.on("load", function () {
              console.log("✅ Texture đã được thêm vào Assets:", n),
                alert("Texture đã được thêm vào Assets!");
            }),
            a.app.assets.load(n);
        }),
          (i.src = r.target.result);
      }),
        r.readAsDataURL(t);
    } else alert("Vui lòng nhập tên và chọn texture!");
  }),
  (MaterialForm.prototype.update = function (e) {});
