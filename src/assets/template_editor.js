module.exports = (function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 0))
  );
})([
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var n,
      o = r(1),
      a = (n = o) && n.__esModule ? n : { default: n };
    var i = null;
    var u = (0, o.forwardRef)(function (e, t) {
      e.className;
      var r = e.state,
        n = e.onEditorLoad,
        u = e.onFetched,
        d = e.editorHostUrl,
        s = void 0 === d ? "https://editor.ravenapp.dev/" : d;
      !(function (e, t) {
        var r = {};
        for (var n in e)
          t.indexOf(n) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]));
      })(e, [
        "className",
        "state",
        "onEditorLoad",
        "onFetched",
        "editorHostUrl",
      ]),
        console.log(s);
      var l = (0, o.useCallback)(
        function (e) {
          if (s.includes(e.origin))
            switch (e.data.message) {
              case "editorLoaded":
                n();
                break;
              case "savedState":
                var t = e.data.value;
                u(t.state, t.html);
            }
        },
        [n, u, s]
      );
      return (
        (0, o.useEffect)(
          function () {
            window.removeEventListener("message", i),
              (i = l),
              window.addEventListener("message", l);
          },
          [l]
        ),
        (0, o.useImperativeHandle)(t, function () {
          return {
            fetchState: function () {
              window.frames.emailEditor.postMessage(
                { message: "fetchState", value: !0 },
                s
              );
            },
          };
        }),
        a.default.createElement("iframe", {
          title: "my-editor",
          ref: t,
          name: "emailEditor",
          frameBorder: "0",
          marginWidth: "0",
          marginHeight: "0",
          width: "100%",
          height: "100%",
          onLoad: function () {
            window.frames.emailEditor.postMessage(
              { message: "loadEditor", value: r },
              s
            );
          },
          src: s,
        })
      );
    });
    t.default = u;
  },
  function (e, t) {
    e.exports = require("react");
  },
]);
