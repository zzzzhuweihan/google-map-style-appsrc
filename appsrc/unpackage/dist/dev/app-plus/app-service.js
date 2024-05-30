if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$8 = {
    data() {
      return {};
    },
    methods: {
      startRoute: function() {
        uni.switchTab({
          url: "/pages/router_plan/router_plan"
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("nav", { class: "navbar" }, [
        vue.createElementVNode("div", { class: "logo" }, "EcoRoute")
      ]),
      vue.createCommentVNode(" Banner "),
      vue.createElementVNode("div", { class: "banner" }, [
        vue.createElementVNode("h1", null, "Welcome to EcoRoute"),
        vue.createElementVNode("p", null, "Your journey to a healthier, greener life starts here."),
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.startRoute && $options.startRoute(...args)),
          type: "submit",
          style: { "margin-top": "10px", "height": "40px", "width": "200px", "line-height": "20px" }
        }, "Plan Your Route")
      ]),
      vue.createCommentVNode(" Features Section "),
      vue.createElementVNode("div", { class: "features" }, [
        vue.createElementVNode("h2", null, "Our Features"),
        vue.createElementVNode("div", { class: "feature" }, [
          vue.createElementVNode("h3", null, "Pollution-Aware Route Planning"),
          vue.createElementVNode("p", null, "Plan your routes to minimize exposure to pollution. Our app provides real-time data to help you choose the cleanest paths for biking, walking, or driving.")
        ]),
        vue.createElementVNode("div", { class: "feature" }, [
          vue.createElementVNode("h3", null, "Real-Time Air Quality Monitoring"),
          vue.createElementVNode("p", null, "Stay informed about the air quality in your area. Our app integrates real-time AQI data to ensure you are always aware of the environmental conditions around you.")
        ]),
        vue.createElementVNode("div", { class: "feature" }, [
          vue.createElementVNode("h3", null, "Customizable Preferences"),
          vue.createElementVNode("p", null, "Tailor your route preferences based on your needs. Whether you prefer the fastest route, the shortest distance, or the least polluted path, our app has you covered.")
        ]),
        vue.createElementVNode("div", { class: "feature" }, [
          vue.createElementVNode("h3", null, "Interactive Map Interface"),
          vue.createElementVNode("p", null, "Explore your routes with our interactive map. Get detailed information on distance, travel time, and pollution levels for each suggested route.")
        ]),
        vue.createElementVNode("div", { class: "feature" }, [
          vue.createElementVNode("h3", null, "Health & Safety Tips"),
          vue.createElementVNode("p", null, "Access helpful tips and suggestions to protect yourself from pollution while traveling. Learn about protective gear, best travel times, and more.")
        ])
      ]),
      vue.createElementVNode("footer", null, [
        vue.createElementVNode("p", null, "© 2024 EcoRoute. All rights reserved."),
        vue.createElementVNode("a", { href: "privacy.html" }, "Privacy Policy"),
        vue.createElementVNode("a", { href: "terms.html" }, "Terms of Service"),
        vue.createElementVNode("div", { class: "social-media" }, [
          vue.createElementVNode("a", { href: "#" }, "Facebook"),
          vue.createElementVNode("a", { href: "#" }, "Twitter"),
          vue.createElementVNode("a", { href: "#" }, "Instagram")
        ])
      ])
    ]);
  }
  const PagesHomeHome = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "H:/aak/gh/pages/home/home.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        title: "input",
        focus: false,
        inputValue: "",
        showClearIcon: false,
        inputClearValue: "",
        changeValue: "",
        showPassword: true,
        src: "../../../static/eye-1.png",
        platform: "",
        isNvue: false
      };
    },
    methods: {
      onKeyInput: function(event) {
        this.inputValue = event.detail.value;
      },
      replaceInput: function(event) {
        var value = event.detail.value;
        if (value === "11") {
          this.changeValue = "2";
        }
      },
      hideKeyboard: function(event) {
        if (event.detail.value === "123") {
          uni.hideKeyboard();
        }
      },
      clearInput: function(event) {
        this.inputClearValue = event.detail.value;
        if (event.detail.value.length > 0) {
          this.showClearIcon = true;
        } else {
          this.showClearIcon = false;
        }
      },
      clearIcon: function() {
        this.inputClearValue = "";
        this.showClearIcon = false;
      },
      changePassword: function() {
        this.showPassword = !this.showPassword;
      },
      onFocus() {
        this.$mp.page.$getAppWebview().setStyle({
          softinputNavBar: "none"
        });
      },
      onBlur() {
        this.$mp.page.$getAppWebview().setStyle({
          softinputNavBar: "auto"
        });
      }
    },
    onLoad() {
      this.platform = uni.getSystemInfoSync().platform;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "nvue-page-root" }, [
      vue.createElementVNode("view", { class: "page-title" }, [
        vue.createElementVNode("view", { class: "page-title__wrapper" }, [
          vue.createElementVNode(
            "text",
            { class: "page-title__text" },
            vue.toDisplayString($data.title),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "uni-common-mt" }, [
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "可自动聚焦的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              focus: "",
              placeholder: "自动获得焦点"
            })
          ])
        ]),
        $data.platform === "ios" && !$data.isNvue ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-form-item uni-column"
        }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "隐藏 iOS 软键盘上的导航条")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode(
              "input",
              {
                class: "uni-input",
                placeholder: "触摸其他地方收起键盘",
                onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
                onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args))
              },
              null,
              32
              /* NEED_HYDRATION */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "键盘右下角按钮显示为搜索")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              "confirm-type": "search",
              placeholder: "键盘右下角按钮显示为搜索"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "键盘右下角按钮显示为发送")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              "confirm-type": "send",
              placeholder: "键盘右下角按钮显示为发送"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "控制最大输入长度的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              maxlength: "10",
              placeholder: "最大输入长度为10"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode(
              "text",
              { class: "uni-form-item__title" },
              "实时获取输入值：" + vue.toDisplayString($data.inputValue),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode(
              "input",
              {
                class: "uni-input",
                onInput: _cache[2] || (_cache[2] = (...args) => $options.onKeyInput && $options.onKeyInput(...args)),
                placeholder: "输入同步到view中"
              },
              null,
              32
              /* NEED_HYDRATION */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "控制输入的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "uni-input",
                onInput: _cache[3] || (_cache[3] = (...args) => $options.replaceInput && $options.replaceInput(...args)),
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.changeValue = $event),
                placeholder: "连续的两个1会变成2"
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ), [
              [vue.vModelText, $data.changeValue]
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "控制键盘的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode(
              "input",
              {
                class: "uni-input",
                ref: "input1",
                onInput: _cache[5] || (_cache[5] = (...args) => $options.hideKeyboard && $options.hideKeyboard(...args)),
                placeholder: "输入123自动收起键盘"
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "数字输入的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              type: "number",
              placeholder: "这是一个数字输入框"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "密码输入的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              password: "",
              type: "text",
              placeholder: "这是一个密码输入框"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "带小数点的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              type: "digit",
              placeholder: "带小数点的数字键盘"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "身份证输入的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              type: "idcard",
              placeholder: "身份证输入键盘"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "控制占位符颜色的 input")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              "placeholder-style": "color:#F76260",
              placeholder: "占位符字体是红色的"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "带清除按钮的输入框")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              placeholder: "带清除按钮的输入框",
              value: $data.inputClearValue,
              onInput: _cache[6] || (_cache[6] = (...args) => $options.clearInput && $options.clearInput(...args))
            }, null, 40, ["value"]),
            $data.showClearIcon ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-icon",
              onClick: _cache[7] || (_cache[7] = (...args) => $options.clearIcon && $options.clearIcon(...args))
            }, "")) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        vue.createElementVNode("view", { class: "uni-form-item uni-column" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("text", { class: "uni-form-item__title" }, "可查看密码的输入框")
          ]),
          vue.createElementVNode("view", { class: "uni-input-wrapper" }, [
            vue.createElementVNode("input", {
              class: "uni-input",
              placeholder: "请输入密码",
              password: $data.showPassword
            }, null, 8, ["password"]),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["uni-icon", [!$data.showPassword ? "uni-eye-active" : ""]]),
                onClick: _cache[8] || (_cache[8] = (...args) => $options.changePassword && $options.changePassword(...args))
              },
              "",
              2
              /* CLASS */
            )
          ])
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-1cf27b2a"], ["__file", "H:/aak/gh/pages/index/index.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var isIOS;
  function album() {
    var result = 0;
    var PHPhotoLibrary = plus.ios.import("PHPhotoLibrary");
    var authStatus = PHPhotoLibrary.authorizationStatus();
    if (authStatus === 0) {
      result = null;
    } else if (authStatus == 3) {
      result = 1;
    } else {
      result = 0;
    }
    plus.ios.deleteObject(PHPhotoLibrary);
    return result;
  }
  function camera() {
    var result = 0;
    var AVCaptureDevice = plus.ios.import("AVCaptureDevice");
    var authStatus = AVCaptureDevice.authorizationStatusForMediaType("vide");
    if (authStatus === 0) {
      result = null;
    } else if (authStatus == 3) {
      result = 1;
    } else {
      result = 0;
    }
    plus.ios.deleteObject(AVCaptureDevice);
    return result;
  }
  function location() {
    var result = 0;
    var cllocationManger = plus.ios.import("CLLocationManager");
    var enable = cllocationManger.locationServicesEnabled();
    var status = cllocationManger.authorizationStatus();
    if (!enable) {
      result = 2;
    } else if (status === 0) {
      result = null;
    } else if (status === 3 || status === 4) {
      result = 1;
    } else {
      result = 0;
    }
    plus.ios.deleteObject(cllocationManger);
    return result;
  }
  function push() {
    var result = 0;
    var UIApplication = plus.ios.import("UIApplication");
    var app = UIApplication.sharedApplication();
    var enabledTypes = 0;
    if (app.currentUserNotificationSettings) {
      var settings = app.currentUserNotificationSettings();
      enabledTypes = settings.plusGetAttribute("types");
      if (enabledTypes == 0) {
        result = 0;
        formatAppLog("log", "at common/permission.js:63", "推送权限没有开启");
      } else {
        result = 1;
        formatAppLog("log", "at common/permission.js:66", "已经开启推送功能!");
      }
      plus.ios.deleteObject(settings);
    } else {
      enabledTypes = app.enabledRemoteNotificationTypes();
      if (enabledTypes == 0) {
        result = 3;
        formatAppLog("log", "at common/permission.js:73", "推送权限没有开启!");
      } else {
        result = 4;
        formatAppLog("log", "at common/permission.js:76", "已经开启推送功能!");
      }
    }
    plus.ios.deleteObject(app);
    plus.ios.deleteObject(UIApplication);
    return result;
  }
  function contact() {
    var result = 0;
    var CNContactStore = plus.ios.import("CNContactStore");
    var cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0);
    if (cnAuthStatus === 0) {
      result = null;
    } else if (cnAuthStatus == 3) {
      result = 1;
    } else {
      result = 0;
    }
    plus.ios.deleteObject(CNContactStore);
    return result;
  }
  function record() {
    var result = null;
    var avaudiosession = plus.ios.import("AVAudioSession");
    var avaudio = avaudiosession.sharedInstance();
    var status = avaudio.recordPermission();
    formatAppLog("log", "at common/permission.js:104", "permissionStatus:" + status);
    if (status === 1970168948) {
      result = null;
    } else if (status === 1735552628) {
      result = 1;
    } else {
      result = 0;
    }
    plus.ios.deleteObject(avaudiosession);
    return result;
  }
  function calendar() {
    var result = null;
    var EKEventStore = plus.ios.import("EKEventStore");
    var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(0);
    if (ekAuthStatus == 3) {
      result = 1;
      formatAppLog("log", "at common/permission.js:122", "日历权限已经开启");
    } else {
      formatAppLog("log", "at common/permission.js:124", "日历权限没有开启");
    }
    plus.ios.deleteObject(EKEventStore);
    return result;
  }
  function memo() {
    var result = null;
    var EKEventStore = plus.ios.import("EKEventStore");
    var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(1);
    if (ekAuthStatus == 3) {
      result = 1;
      formatAppLog("log", "at common/permission.js:136", "备忘录权限已经开启");
    } else {
      formatAppLog("log", "at common/permission.js:138", "备忘录权限没有开启");
    }
    plus.ios.deleteObject(EKEventStore);
    return result;
  }
  function requestIOS(permissionID) {
    return new Promise((resolve, reject) => {
      switch (permissionID) {
        case "push":
          resolve(push());
          break;
        case "location":
          resolve(location());
          break;
        case "record":
          resolve(record());
          break;
        case "camera":
          resolve(camera());
          break;
        case "album":
          resolve(album());
          break;
        case "contact":
          resolve(contact());
          break;
        case "calendar":
          resolve(calendar());
          break;
        case "memo":
          resolve(memo());
          break;
        default:
          resolve(0);
          break;
      }
    });
  }
  function requestAndroid(permissionID) {
    return new Promise((resolve, reject) => {
      plus.android.requestPermissions(
        [permissionID],
        function(resultObj) {
          var result = 0;
          for (var i = 0; i < resultObj.granted.length; i++) {
            var grantedPermission = resultObj.granted[i];
            formatAppLog("log", "at common/permission.js:187", "已获取的权限：" + grantedPermission);
            result = 1;
          }
          for (var i = 0; i < resultObj.deniedPresent.length; i++) {
            var deniedPresentPermission = resultObj.deniedPresent[i];
            formatAppLog("log", "at common/permission.js:192", "拒绝本次申请的权限：" + deniedPresentPermission);
            result = 0;
          }
          for (var i = 0; i < resultObj.deniedAlways.length; i++) {
            var deniedAlwaysPermission = resultObj.deniedAlways[i];
            formatAppLog("log", "at common/permission.js:197", "永久拒绝申请的权限：" + deniedAlwaysPermission);
            result = -1;
          }
          resolve(result);
        },
        function(error) {
          formatAppLog("log", "at common/permission.js:203", "result error: " + error.message);
          resolve({
            code: error.code,
            message: error.message
          });
        }
      );
    });
  }
  function gotoAppPermissionSetting() {
    if (permission.isIOS) {
      var UIApplication = plus.ios.import("UIApplication");
      var application2 = UIApplication.sharedApplication();
      var NSURL2 = plus.ios.import("NSURL");
      var setting2 = NSURL2.URLWithString("app-settings:");
      application2.openURL(setting2);
      plus.ios.deleteObject(setting2);
      plus.ios.deleteObject(NSURL2);
      plus.ios.deleteObject(application2);
    } else {
      var Intent = plus.android.importClass("android.content.Intent");
      var Settings = plus.android.importClass("android.provider.Settings");
      var Uri = plus.android.importClass("android.net.Uri");
      var mainActivity = plus.android.runtimeMainActivity();
      var intent = new Intent();
      intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
      var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
      intent.setData(uri);
      mainActivity.startActivity(intent);
    }
  }
  const permission = {
    get isIOS() {
      return typeof isIOS === "boolean" ? isIOS : isIOS = uni.getSystemInfoSync().platform === "ios";
    },
    requestIOS,
    requestAndroid,
    gotoAppSetting: gotoAppPermissionSetting
  };
  const _sfc_main$6 = {
    data() {
      return {
        title: "getLocation",
        hasLocation: false,
        location: {},
        type: "",
        map: {},
        receiveLocaDate: {
          lat: "35.00125",
          lon: "109.563582"
        },
        receiveTraceDate: [],
        startLoc: "Heslington, York YO10 5DD, United Kingdom",
        endLoc: "Rose Villa, 15-16 Main St, Heslington, York YO10 5EA, United Kingdom",
        selectedMode: "BICYCLING",
        selectedPreference: "least_polluted",
        airQualityData: null,
        errorMessage: "",
        aqiBoxColor: "#efeff4"
      };
    },
    onLoad: function() {
      this.getLocation();
    },
    methods: {
      togglePopup(type) {
        this.type = type;
      },
      showConfirm() {
        this.type = "showpopup";
      },
      hideConfirm() {
        this.type = "";
      },
      async startRouterPlan() {
        if (!this.hasLocation) {
          uni.showToast({
            icon: "loading",
            title: "Plase wait Getting current location"
          });
          return;
        }
        this.receiveLocaDate.startLoc = this.startLoc;
        this.receiveLocaDate.endLoc = this.endLoc;
        this.receiveLocaDate.selectedMode = this.selectedMode;
        uni.setStorageSync("currentLoc", JSON.stringify(this.receiveLocaDate));
        uni.navigateTo({
          url: `/pages/map/map?lat=${this.receiveLocaDate.lat}&lon=${this.receiveLocaDate.lon}`
        });
      },
      async getLocation() {
        let status = await this.checkPermission();
        if (status !== 1) {
          return;
        }
        this.doGetLocation();
      },
      doGetLocation() {
        let that = this;
        uni.getLocation({
          success: (res) => {
            that.hasLocation = true;
            that.receiveLocaDate.lon = res.longitude;
            that.receiveLocaDate.lat = res.latitude;
            that.getAirQuality(res.longitude, res.latitude);
            formatAppLog("log", "at pages/router_plan/router_plan.vue:148", res);
          },
          fail: (err) => {
            if (err.errMsg.indexOf("auth deny") >= 0) {
              uni.showToast({
                title: "访问位置被拒绝"
              });
            } else {
              uni.showToast({
                title: err.errMsg
              });
            }
          }
        });
      },
      getSetting: function() {
        return new Promise((resolve, reject) => {
          uni.getSetting({
            success: (res) => {
              if (res.authSetting["scope.userLocation"] === void 0) {
                resolve(0);
                return;
              }
              if (res.authSetting["scope.userLocation"]) {
                resolve(1);
              } else {
                resolve(2);
              }
            }
          });
        });
      },
      async getAirQuality(lat, lng) {
        let that = this;
        lat = 53.94617694646508;
        lng = -1.051777705810919;
        uni.request({
          url: "https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyB3SXIcka2RbPu1WamesFrSt692xlwehX4",
          //接收请求的API
          method: "POST",
          //接收请求的方式,如果不传默认为GET
          data: {
            location: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng)
            }
          },
          header: {
            "Content-Type": "application/json"
          },
          success(res) {
            that.airQualityData = res.data;
            const index = that.airQualityData.indexes[0];
            that.aqiBoxColor = `rgb(${index.color.red * 255}, ${index.color.green * 255}, ${index.color.blue * 255})`;
            formatAppLog("log", "at pages/router_plan/router_plan.vue:209", that.airQualityData);
          },
          fail: (err) => {
            formatAppLog("log", "at pages/router_plan/router_plan.vue:212", err);
          }
        });
      },
      openSetting: function() {
        this.hideConfirm();
        uni.openSetting({
          success: (res) => {
            if (res.authSetting && res.authSetting["scope.userLocation"]) {
              this.doGetLocation();
            }
          },
          fail: (err) => {
          }
        });
      },
      async checkPermission() {
        let status = permission.isIOS ? await permission.requestIOS("location") : await permission.requestAndroid("android.permission.ACCESS_FINE_LOCATION");
        if (status === null || status === 1) {
          status = 1;
        } else if (status === 2) {
          uni.showModal({
            content: "系统定位已关闭",
            confirmText: "确定",
            showCancel: false,
            success: function(res) {
            }
          });
        } else if (status.code) {
          uni.showModal({
            content: status.message
          });
        } else {
          uni.showModal({
            content: "需要定位权限",
            confirmText: "设置",
            success: function(res) {
              if (res.confirm) {
                permission.gotoAppSetting();
              }
            }
          });
        }
        return status;
      },
      clear: function() {
        this.hasLocation = false;
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("nav", { class: "navbar" }, [
        vue.createElementVNode("div", { class: "logo" }, "EcoRoute")
      ]),
      vue.createCommentVNode(" Route Planner Module "),
      vue.createElementVNode("view", { class: "planner-page" }, [
        $data.airQualityData ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "container"
        }, [
          vue.createElementVNode("div", { class: "header" }, [
            vue.createElementVNode("h1", null, "Air Quality Index"),
            vue.createElementVNode(
              "p",
              { id: "dateTime" },
              "Date & Time:" + vue.toDisplayString($data.airQualityData.dateTime),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "p",
              { id: "regionCode" },
              "Region Code:" + vue.toDisplayString($data.airQualityData.regionCode),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode(
            "div",
            {
              class: "aqi-box",
              id: "aqiBox",
              style: vue.normalizeStyle({ backgroundColor: $data.aqiBoxColor })
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: "aqi-value",
                  id: "aqiValue"
                },
                "AQI:" + vue.toDisplayString($data.airQualityData.indexes[0].aqi),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: "category",
                  id: "category"
                },
                vue.toDisplayString($data.airQualityData.indexes[0].category),
                1
                /* TEXT */
              ),
              vue.createElementVNode("p", null, [
                vue.createTextVNode("Dominant Pollutant: "),
                vue.createElementVNode(
                  "span",
                  { id: "dominantPollutant" },
                  vue.toDisplayString($data.airQualityData.indexes[0].dominantPollutant),
                  1
                  /* TEXT */
                )
              ])
            ],
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "search-module",
          style: { "gap": "10px", "display": "flex", "flex-direction": "column" }
        }, [
          vue.createElementVNode("h1", null, "Route Planner"),
          vue.createElementVNode("label", { for: "start" }, "Start:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              type: "text",
              id: "start",
              name: "start",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.startLoc = $event),
              placeholder: "Enter starting location"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.startLoc]
          ]),
          vue.createElementVNode("label", { for: "end" }, "End:"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              type: "text",
              id: "end",
              name: "end",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.endLoc = $event),
              placeholder: "Enter destination"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.endLoc]
          ]),
          vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "gap": "10px" } }, [
            vue.createElementVNode("label", { for: "mode" }, "Mode:"),
            vue.withDirectives(vue.createElementVNode(
              "select",
              {
                id: "mode",
                name: "mode",
                style: { "width": "100%" },
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.selectedMode = $event)
              },
              [
                vue.createElementVNode("option", { value: "BICYCLING" }, "Bicycling"),
                vue.createElementVNode("option", { value: "WALKING" }, "Walk"),
                vue.createElementVNode("option", { value: "DRIVING" }, "Drive"),
                vue.createElementVNode("option", { value: "TRANSIT" }, "Transit")
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelSelect, $data.selectedMode]
            ])
          ]),
          vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "gap": "10px" } }, [
            vue.createElementVNode("label", { for: "preference" }, "Preference:"),
            vue.withDirectives(vue.createElementVNode(
              "select",
              {
                id: "preference",
                name: "preference",
                style: { "width": "100%" },
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.selectedPreference = $event)
              },
              [
                vue.createElementVNode("option", { value: "fastest" }, "Fastest"),
                vue.createElementVNode("option", { value: "shortest" }, "Shortest"),
                vue.createElementVNode("option", { value: "least_polluted" }, "Least Polluted")
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelSelect, $data.selectedPreference]
            ])
          ]),
          vue.createElementVNode("button", {
            type: "submit",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.startRouterPlan && $options.startRouterPlan(...args)),
            style: { "margin-top": "10px", "height": "40px", "width": "200px", "line-height": "20px" }
          }, "Get Route")
        ])
      ])
    ]);
  }
  const PagesRouter_planRouter_plan = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "H:/aak/gh/pages/router_plan/router_plan.vue"]]);
  const _sfc_main$5 = {
    props: {
      hasLeftWin: {
        type: Boolean
      },
      leftWinActive: {
        type: String
      }
    },
    data() {
      return {};
    },
    onNavigationBarButtonTap(e) {
      uni.navigateTo({
        url: "/pages/about/about"
      });
    },
    methods: {
      goto(e) {
        let url = "";
        if (e == 0) {
          url = "/pages/contact/contact";
        } else if (e == 1) {
          url = "/pages/about/about";
        } else if (e == 2) {
          url = "/pages/opensource/opensource";
        }
        uni.navigateTo({
          url
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("nav", { class: "navbar" }, [
        vue.createElementVNode("div", { class: "logo" }, "EcoRoute")
      ]),
      vue.createElementVNode("view", { class: "uni-container" }, [
        vue.createElementVNode("view", { class: "pc-hide uni-panel" }, [
          vue.createElementVNode("view", {
            class: "uni-panel-h",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.goto(0))
          }, [
            vue.createElementVNode("text", { class: "uni-panel-text" }, "Contact US")
          ])
        ]),
        vue.createElementVNode("view", { class: "pc-hide uni-panel" }, [
          vue.createElementVNode("view", {
            class: "uni-panel-h",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.goto(1))
          }, [
            vue.createElementVNode("text", { class: "uni-panel-text" }, "About US")
          ])
        ]),
        vue.createElementVNode("view", { class: "pc-hide uni-panel" }, [
          vue.createElementVNode("view", {
            class: "uni-panel-h",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.goto(2))
          }, [
            vue.createElementVNode("text", { class: "uni-panel-text" }, "OpenSource Software")
          ])
        ])
      ])
    ]);
  }
  const PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "H:/aak/gh/pages/setting/setting.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("nav", { class: "navbar" }, [
        vue.createElementVNode("div", { class: "logo" }, "EcoRoute")
      ]),
      vue.createElementVNode("div", { class: "container" }, [
        vue.createElementVNode("h1", null, "Open Source Software Used"),
        vue.createElementVNode("p", null, " EcoRoute leverages several open source software and services to deliver an efficient and user-friendly application. Utilizing open source technologies allows us to build robust features while maintaining flexibility and innovation. Below is a list of the key open source software and services we have integrated into our application, along with their respective licenses and descriptions. "),
        vue.createElementVNode("div", {
          class: "open-source-section",
          style: { "margin-top": "20px" }
        }, [
          vue.createElementVNode("h2", null, "Vue.js"),
          vue.createElementVNode("p", null, [
            vue.createElementVNode("strong", null, "Website:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://vuejs.org/",
              target: "_blank"
            }, "https://vuejs.org/"),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "Description:"),
            vue.createTextVNode(" Vue.js is a progressive JavaScript framework for building user interfaces."),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "License:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://opensource.org/licenses/MIT",
              target: "_blank"
            }, "MIT License")
          ])
        ]),
        vue.createElementVNode("div", { class: "open-source-section" }, [
          vue.createElementVNode("h2", null, "Google Maps API"),
          vue.createElementVNode("p", null, [
            vue.createElementVNode("strong", null, "Website:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://developers.google.com/maps",
              target: "_blank"
            }, "https://developers.google.com/maps"),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "Description:"),
            vue.createTextVNode(" Google Maps API provides a wide range of mapping services and functionalities to create custom maps."),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "License:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://cloud.google.com/maps-platform/terms",
              target: "_blank"
            }, "Google Maps Platform Terms of Service")
          ])
        ]),
        vue.createElementVNode("div", { class: "open-source-section" }, [
          vue.createElementVNode("h2", null, "Virtual Air Quality API"),
          vue.createElementVNode("p", null, [
            vue.createElementVNode("strong", null, "Website:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://www.virtual-air-quality.com/",
              target: "_blank"
            }, "https://www.virtual-air-quality.com/"),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "Description:"),
            vue.createTextVNode(" Virtual Air Quality API provides real-time air quality data."),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "License:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://www.virtual-air-quality.com/terms",
              target: "_blank"
            }, "API Terms of Service")
          ])
        ]),
        vue.createElementVNode("div", { class: "open-source-section" }, [
          vue.createElementVNode("h2", null, "HBuilderX"),
          vue.createElementVNode("p", null, [
            vue.createElementVNode("strong", null, "Website:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://www.dcloud.io/hbuilderx.html",
              target: "_blank"
            }, "https://www.dcloud.io/hbuilderx.html"),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "Description:"),
            vue.createTextVNode(" HBuilderX is a fast development tool supporting multiple languages and frameworks."),
            vue.createElementVNode("br"),
            vue.createElementVNode("strong", null, "License:"),
            vue.createTextVNode(),
            vue.createElementVNode("a", {
              href: "https://www.dcloud.io/license.html",
              target: "_blank"
            }, "DCloud License")
          ])
        ])
      ])
    ]);
  }
  const PagesOpensourceOpensource = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "H:/aak/gh/pages/opensource/opensource.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("nav", { class: "navbar" }, [
        vue.createElementVNode("div", { class: "logo" }, "EcoRoute")
      ]),
      vue.createCommentVNode(" Contact Page Content "),
      vue.createElementVNode("div", { class: "contact-page" }, [
        vue.createElementVNode("h1", null, "Contact Us"),
        vue.createElementVNode("p", null, "If you have any questions, suggestions, or need support, please reach out to us using the form below or through our contact details."),
        vue.createElementVNode("div", { class: "contact-details" }, [
          vue.createElementVNode("h3", null, "Contact Details"),
          vue.createElementVNode("p", null, "Email: support@ecoroute.com"),
          vue.createElementVNode("p", null, "Phone: +1 186 567 890"),
          vue.createElementVNode("p", null, "Address: xxx Street, xxx City, xxx")
        ]),
        vue.createElementVNode("div", { class: "contact-form" }, [
          vue.createElementVNode("h3", null, "Contact Form"),
          vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column" } }, [
            vue.createElementVNode("label", { for: "name" }, "Name:"),
            vue.createElementVNode("input", {
              type: "text",
              id: "name",
              name: "name",
              placeholder: "Your Name"
            })
          ]),
          vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column" } }, [
            vue.createElementVNode("label", { for: "email" }, "Email:"),
            vue.createElementVNode("input", {
              type: "email",
              id: "email",
              name: "email",
              placeholder: "Your Email"
            })
          ]),
          vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column" } }, [
            vue.createElementVNode("label", { for: "subject" }, "Subject:"),
            vue.createElementVNode("input", {
              type: "text",
              id: "subject",
              name: "subject",
              placeholder: "Subject"
            })
          ]),
          vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column" } }, [
            vue.createElementVNode("label", { for: "message" }, "Message:"),
            vue.createElementVNode("textarea", {
              id: "message",
              name: "message",
              rows: "6",
              placeholder: "Your Message"
            })
          ]),
          vue.createElementVNode("button", {
            type: "submit",
            style: { "margin-top": "10px", "height": "40px", "width": "200px", "line-height": "20px" }
          }, "Submit")
        ])
      ])
    ]);
  }
  const PagesContactContact = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "H:/aak/gh/pages/contact/contact.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" Navigation Bar "),
      vue.createElementVNode("nav", { class: "navbar" }, [
        vue.createElementVNode("div", { class: "logo" }, "EcoRoute")
      ]),
      vue.createCommentVNode(" About Page Content "),
      vue.createElementVNode("div", { class: "about-page" }, [
        vue.createElementVNode("h1", null, "About EcoRoute"),
        vue.createElementVNode("p", null, "Welcome to EcoRoute! Our mission is to help you plan routes that minimize your exposure to pollution, making your journeys healthier and more environmentally friendly."),
        vue.createElementVNode("h2", null, "How to Use the App"),
        vue.createElementVNode("ol", null, [
          vue.createElementVNode("li", null, "Enter your starting point and destination in the Route Planner."),
          vue.createElementVNode("li", null, "Select your preferred mode of transport: Bike, Walk, or Drive."),
          vue.createElementVNode("li", null, "Choose your optimization preference: Fastest, Shortest, or Least Polluted."),
          vue.createElementVNode("li", null, 'Click "Get Route" to see the suggested routes along with detailed information on time, distance, and pollution levels.'),
          vue.createElementVNode("li", null, "Select the route that best meets your needs and start your journey!")
        ]),
        vue.createElementVNode("h2", null, "Help & Support"),
        vue.createElementVNode("p", null, [
          vue.createTextVNode("If you need assistance with using the app, please refer to our "),
          vue.createElementVNode("a", { href: "faq.html" }, "FAQ page"),
          vue.createTextVNode(" for common questions and answers. For further support, you can reach out to our customer service team through the "),
          vue.createElementVNode("a", { href: "contact.html" }, "Contact page"),
          vue.createTextVNode(".")
        ]),
        vue.createElementVNode("h2", null, "Tips & Suggestions"),
        vue.createElementVNode("ul", null, [
          vue.createElementVNode("li", null, "Check the real-time air quality index (AQI) displayed on the home page before planning your route."),
          vue.createElementVNode("li", null, "For the least polluted routes, consider traveling during times when traffic is lower and air quality is generally better."),
          vue.createElementVNode("li", null, "Stay informed about the environmental conditions in your area by enabling notifications in the app settings."),
          vue.createElementVNode("li", null, "If you're a cyclist or pedestrian, use protective gear like masks to further reduce exposure to pollutants.")
        ])
      ])
    ]);
  }
  const PagesAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "H:/aak/gh/pages/about/about.vue"]]);
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("renderScript");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["renderScript"] = "7e839308";
  };
  const _sfc_main$1 = {
    data() {
      return {
        title: "getLocation",
        hasLocation: false,
        location: {},
        type: "",
        map: {},
        receiveLocaDate: {
          lat: "35.00125",
          lon: "109.563582"
        },
        receiveTraceDate: [],
        selectedMode: "drive",
        selectedPreference: "least_polluted",
        routesInfo: []
      };
    },
    onLoad: function(e) {
      formatAppLog("log", "at pages/map/map.vue:57", e);
      let k = uni.getStorageSync("currentLoc");
      this.receiveLocaDate = JSON.parse(k);
      formatAppLog("log", "at pages/map/map.vue:60", this.receiveLocaDate);
      this.receiveLocaDate.lat = parseFloat(e.lat);
      this.receiveLocaDate.lon = parseFloat(e.lon);
    },
    methods: {
      togglePopup(type) {
        this.type = type;
      },
      showConfirm() {
        this.type = "showpopup";
      },
      hideConfirm() {
        this.type = "";
      },
      getSetting: function() {
        return new Promise((resolve, reject) => {
          uni.getSetting({
            success: (res) => {
              if (res.authSetting["scope.userLocation"] === void 0) {
                resolve(0);
                return;
              }
              if (res.authSetting["scope.userLocation"]) {
                resolve(1);
              } else {
                resolve(2);
              }
            }
          });
        });
      },
      openSetting: function() {
        this.hideConfirm();
        uni.openSetting({
          success: (res) => {
            if (res.authSetting && res.authSetting["scope.userLocation"]) {
              this.doGetLocation();
            }
          },
          fail: (err) => {
          }
        });
      },
      async checkPermission() {
        let status = permission.isIOS ? await permission.requestIOS("location") : await permission.requestAndroid("android.permission.ACCESS_FINE_LOCATION");
        if (status === null || status === 1) {
          status = 1;
        } else if (status === 2) {
          uni.showModal({
            content: "系统定位已关闭",
            confirmText: "确定",
            showCancel: false,
            success: function(res) {
            }
          });
        } else if (status.code) {
          uni.showModal({
            content: status.message
          });
        } else {
          uni.showModal({
            content: "需要定位权限",
            confirmText: "设置",
            success: function(res) {
              if (res.confirm) {
                permission.gotoAppSetting();
              }
            }
          });
        }
        return status;
      },
      clear: function() {
        this.hasLocation = false;
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", {
        id: "map",
        data: vue.wp($data.receiveLocaDate),
        "change:data": _ctx.renderScript.getData
      }, null, 8, ["data", "change:data"]),
      vue.createCommentVNode(" Route Planner Module "),
      vue.createElementVNode("view", { class: "planner-page" }, [
        vue.createCommentVNode(" Results and Recommendations Module "),
        vue.createElementVNode("view", { class: "results" }, [
          vue.createElementVNode("h3", null, "Route Options"),
          vue.createElementVNode("ul", { id: "routes-list" })
        ]),
        vue.createCommentVNode(" Health & Safety Tips Module "),
        vue.createElementVNode("view", { class: "health-tips" }, [
          vue.createElementVNode("ul")
        ])
      ])
    ]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$1);
  const PagesMapMap = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "H:/aak/gh/pages/map/map.vue"]]);
  __definePage("pages/home/home", PagesHomeHome);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/router_plan/router_plan", PagesRouter_planRouter_plan);
  __definePage("pages/setting/setting", PagesSettingSetting);
  __definePage("pages/opensource/opensource", PagesOpensourceOpensource);
  __definePage("pages/contact/contact", PagesContactContact);
  __definePage("pages/about/about", PagesAboutAbout);
  __definePage("pages/map/map", PagesMapMap);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "H:/aak/gh/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
