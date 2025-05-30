import {
  DialogStyle,
  FocusTrap
} from "./chunk-EJV44NZ5.js";
import {
  zindexutils
} from "./chunk-5H5CNZCN.js";
import {
  Button
} from "./chunk-IDIPUDVQ.js";
import {
  DomHandler
} from "./chunk-5G7WYC4N.js";
import {
  TimesIcon,
  WindowMaximizeIcon,
  WindowMinimizeIcon
} from "./chunk-AESE2OEI.js";
import "./chunk-7F5B2DV6.js";
import {
  BaseComponent
} from "./chunk-QD3TEYEW.js";
import "./chunk-DXNMUKOL.js";
import {
  SharedModule,
  TranslationKeys
} from "./chunk-SGA5FNU5.js";
import {
  addClass,
  appendChild,
  getOuterHeight,
  getOuterWidth,
  getViewport,
  hasClass,
  removeClass,
  setAttribute,
  uuid
} from "./chunk-HV43KYO7.js";
import "./chunk-5AFBDT7A.js";
import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation
} from "./chunk-SLU3FUEE.js";
import "./chunk-CWYBPNCF.js";
import "./chunk-NJ25EVEJ.js";
import {
  CommonModule,
  DOCUMENT,
  NgClass,
  NgComponentOutlet,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
  isPlatformBrowser
} from "./chunk-VJSX7OUC.js";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  Directive,
  Inject,
  Injectable,
  Injector,
  NgModule,
  NgZone,
  Optional,
  Renderer2,
  SkipSelf,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  createComponent,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-7AAXF3AN.js";
import "./chunk-AFUZPXFM.js";
import "./chunk-CGBIJRYX.js";
import {
  Subject
} from "./chunk-DGVHA3AU.js";
import {
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-dynamicdialog.mjs
var _c0 = ["mask"];
var _c1 = ["content"];
var _c2 = ["footer"];
var _c3 = ["titlebar"];
var _c4 = (a0, a1, a2) => ({
  position: "fixed",
  height: "100%",
  width: "100%",
  left: 0,
  top: 0,
  display: "flex",
  "justify-content": a0,
  "align-items": a1,
  "pointer-events": a2
});
var _c5 = (a0) => ({
  "p-dialog p-component": true,
  "p-dialog-maximized": a0
});
var _c6 = () => ({
  display: "flex",
  "flex-direction": "column",
  "pointer-events": "auto"
});
var _c7 = (a0, a1) => ({
  transform: a0,
  transition: a1
});
var _c8 = (a0) => ({
  value: "visible",
  params: a0
});
function DynamicDialogComponent_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 14);
    ɵɵlistener("mousedown", function DynamicDialogComponent_div_2_div_2_Template_div_mousedown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.initResize($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵproperty("ngClass", "p-resizable-handle");
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_1_WindowMaximizeIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "WindowMaximizeIcon");
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_1_WindowMinimizeIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "WindowMinimizeIcon");
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_1_WindowMaximizeIcon_1_Template, 1, 0, "WindowMaximizeIcon", 11)(2, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_1_WindowMinimizeIcon_2_Template, 1, 0, "WindowMinimizeIcon", 11);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.maximized && !ctx_r1.maximizeIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.maximized && !ctx_r1.minimizeIconTemplate);
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_2_1_ng_template_0_Template(rf, ctx) {
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_2_1_Template, 1, 0, null, 21);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.maximizeIconTemplate);
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_3_1_ng_template_0_Template(rf, ctx) {
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_3_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_3_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_3_1_Template, 1, 0, null, 21);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.minimizeIconTemplate);
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 20);
    ɵɵlistener("onClick", function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.maximize());
    })("keydown.enter", function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_Template_p_button_keydown_enter_0_listener() {
      ɵɵrestoreView(_r5);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.maximize());
    });
    ɵɵtemplate(1, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_1_Template, 3, 2, "ng-container", 11)(2, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_2_Template, 2, 1, "ng-container", 11)(3, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_ng_container_3_Template, 2, 1, "ng-container", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("styleClass", "p-dialog-maximize-button")("tabindex", ctx_r1.maximizable ? "0" : "-1");
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.maximizeIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.maximized);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.maximized);
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "TimesIcon");
    ɵɵelementContainerEnd();
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_span_2_1_ng_template_0_Template(rf, ctx) {
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtemplate(1, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_span_2_1_Template, 1, 0, null, 21);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.closeIconTemplate);
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 22);
    ɵɵlistener("onClick", function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_Template_p_button_onClick_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.hide());
    })("keydown.enter", function DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_Template_p_button_keydown_enter_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.hide());
    });
    ɵɵtemplate(1, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_ng_container_1_Template, 2, 0, "ng-container", 11)(2, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_span_2_Template, 2, 1, "span", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(4);
    ɵɵproperty("styleClass", "p-dialog-close-button")("ariaLabel", ctx_r1.ddconfig.closeAriaLabel || ctx_r1.defaultCloseAriaLabel);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.closeIconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.closeIconTemplate);
  }
}
function DynamicDialogComponent_div_2_div_3_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "span", 16);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 17);
    ɵɵtemplate(4, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_4_Template, 4, 5, "p-button", 18)(5, DynamicDialogComponent_div_2_div_3_ng_container_3_p_button_5_Template, 3, 4, "p-button", 19);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngClass", "p-dialog-title")("id", ctx_r1.ariaLabelledBy);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.ddconfig.header);
    ɵɵadvance();
    ɵɵproperty("ngClass", "p-dialog-header-actions");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.ddconfig.maximizable);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.closable);
  }
}
function DynamicDialogComponent_div_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 15, 3);
    ɵɵlistener("mousedown", function DynamicDialogComponent_div_2_div_3_Template_div_mousedown_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.initDrag($event));
    });
    ɵɵtemplate(2, DynamicDialogComponent_div_2_div_3_ng_container_2_Template, 1, 0, "ng-container", 12)(3, DynamicDialogComponent_div_2_div_3_ng_container_3_Template, 6, 6, "ng-container", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", "p-dialog-header");
    ɵɵadvance(2);
    ɵɵproperty("ngComponentOutlet", ctx_r1.headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.headerTemplate);
  }
}
function DynamicDialogComponent_div_2_6_ng_template_0_Template(rf, ctx) {
}
function DynamicDialogComponent_div_2_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DynamicDialogComponent_div_2_6_ng_template_0_Template, 0, 0, "ng-template", 23);
  }
}
function DynamicDialogComponent_div_2_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DynamicDialogComponent_div_2_div_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.ddconfig.footer, " ");
  }
}
function DynamicDialogComponent_div_2_div_8_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DynamicDialogComponent_div_2_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 17, 4);
    ɵɵtemplate(2, DynamicDialogComponent_div_2_div_8_ng_container_2_Template, 2, 1, "ng-container", 11)(3, DynamicDialogComponent_div_2_div_8_ng_container_3_Template, 1, 0, "ng-container", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", "p-dialog-footer");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.footerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngComponentOutlet", ctx_r1.footerTemplate);
  }
}
function DynamicDialogComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7, 1);
    ɵɵlistener("@animation.start", function DynamicDialogComponent_div_2_Template_div_animation_animation_start_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAnimationStart($event));
    })("@animation.done", function DynamicDialogComponent_div_2_Template_div_animation_animation_done_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAnimationEnd($event));
    });
    ɵɵtemplate(2, DynamicDialogComponent_div_2_div_2_Template, 1, 1, "div", 8)(3, DynamicDialogComponent_div_2_div_3_Template, 4, 3, "div", 9);
    ɵɵelementStart(4, "div", 10, 2);
    ɵɵtemplate(6, DynamicDialogComponent_div_2_6_Template, 1, 0, null, 11)(7, DynamicDialogComponent_div_2_ng_container_7_Template, 1, 0, "ng-container", 12);
    ɵɵelementEnd();
    ɵɵtemplate(8, DynamicDialogComponent_div_2_div_8_Template, 4, 3, "div", 13);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleMap(ctx_r1.ddconfig.style);
    ɵɵclassMap(ctx_r1.ddconfig.styleClass);
    ɵɵstyleProp("width", ctx_r1.ddconfig.width)("height", ctx_r1.ddconfig.height);
    ɵɵproperty("ngClass", ɵɵpureFunction1(22, _c5, ctx_r1.maximizable && ctx_r1.maximized))("ngStyle", ɵɵpureFunction0(24, _c6))("@animation", ɵɵpureFunction1(28, _c8, ɵɵpureFunction2(25, _c7, ctx_r1.transformOptions, ctx_r1.ddconfig.transitionOptions || "150ms cubic-bezier(0, 0, 0.2, 1)")))("pFocusTrapDisabled", ctx_r1.ddconfig.focusTrap === false);
    ɵɵattribute("aria-labelledby", ctx_r1.ariaLabelledBy)("aria-modal", true)("id", ctx_r1.dialogId);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.ddconfig.resizable);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.ddconfig.showHeader !== false);
    ɵɵadvance();
    ɵɵproperty("ngClass", "p-dialog-content")("ngStyle", ctx_r1.ddconfig.contentStyle);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.contentTemplate);
    ɵɵadvance();
    ɵɵproperty("ngComponentOutlet", ctx_r1.contentTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.ddconfig.footer || ctx_r1.footerTemplate);
  }
}
var DynamicDialogContent = class _DynamicDialogContent {
  viewContainerRef;
  constructor(viewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  static ɵfac = function DynamicDialogContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DynamicDialogContent)(ɵɵdirectiveInject(ViewContainerRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _DynamicDialogContent,
    selectors: [["", "pDynamicDialogContent", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DynamicDialogContent, [{
    type: Directive,
    args: [{
      selector: "[pDynamicDialogContent]",
      standalone: true
    }]
  }], () => [{
    type: ViewContainerRef
  }], null);
})();
var DynamicDialogStyle = class _DynamicDialogStyle extends DialogStyle {
  name = "dialog";
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDynamicDialogStyle_BaseFactory;
    return function DynamicDialogStyle_Factory(__ngFactoryType__) {
      return (ɵDynamicDialogStyle_BaseFactory || (ɵDynamicDialogStyle_BaseFactory = ɵɵgetInheritedFactory(_DynamicDialogStyle)))(__ngFactoryType__ || _DynamicDialogStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _DynamicDialogStyle,
    factory: _DynamicDialogStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DynamicDialogStyle, [{
    type: Injectable
  }], null, null);
})();
var DynamicDialogClasses;
(function(DynamicDialogClasses2) {
  DynamicDialogClasses2["mask"] = "p-dialog-mask";
  DynamicDialogClasses2["root"] = "p-dialog";
  DynamicDialogClasses2["header"] = "p-dialog-header";
  DynamicDialogClasses2["title"] = "p-dialog-title";
  DynamicDialogClasses2["headerActions"] = "p-dialog-header-actions";
  DynamicDialogClasses2["pcMaximizeButton"] = "p-dialog-maximize-button";
  DynamicDialogClasses2["pcCloseButton"] = "p-dialog-close-button";
  DynamicDialogClasses2["content"] = "p-dialog-content";
  DynamicDialogClasses2["footer"] = "p-dialog-footer";
})(DynamicDialogClasses || (DynamicDialogClasses = {}));
var DynamicDialogConfig = class {
  /**
   * An object to pass to the component loaded inside the Dialog.
   * @group Props
   */
  data;
  /**
   * An object to pass to the component loaded inside the Dialog.
   * @group Props
   */
  inputValues;
  /**
   * Header text of the dialog.
   * @group Props
   */
  header;
  /**
   * Identifies the element (or elements) that labels the element it is applied to.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Footer text of the dialog.
   * @group Props
   */
  footer;
  /**
   * Width of the dialog.
   * @group Props
   */
  width;
  /**
   * Height of the dialog.
   * @group Props
   */
  height;
  /**
   * Specifies if pressing escape key should hide the dialog.
   * @group Props
   */
  closeOnEscape = false;
  /**
   * Specifies if autofocus should happen on show.
   * @group Props
   */
  focusOnShow = true;
  /**
   * When enabled, can only focus on elements inside the dialog.
   * @group Props
   */
  focusTrap = true;
  /**
   * Base zIndex value to use in layering.
   * @group Props
   */
  baseZIndex;
  /**
   * Whether to re-enforce layering through applying zIndex.
   * @group Props
   */
  autoZIndex = false;
  /**
   * Specifies if clicking the modal background should hide the dialog.
   * @group Props
   */
  dismissableMask = false;
  /**
   * Inline style of the component.
   * @group Props
   */
  rtl = false;
  /**
   * Inline style of the comopnent.
   * @group Props
   */
  style;
  /**
   * Inline style of the content.
   * @group Props
   */
  contentStyle;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Transition options of the animation.
   * @group Props
   */
  transitionOptions;
  /**
   * Adds a close icon to the header to hide the dialog.
   * @group Props
   */
  closable = false;
  /**
   * Whether to show the header or not.
   * @group Props
   */
  showHeader = false;
  /**
   * Defines if background should be blocked when dialog is displayed.
   * @group Props
   */
  modal = false;
  /**
   * Style class of the mask.
   * @group Props
   */
  maskStyleClass;
  /**
   * Enables resizing of the content.
   * @group Props
   */
  resizable = false;
  /**
   * Enables dragging to change the position using header.
   * @group Props
   */
  draggable = false;
  /**
   * Keeps dialog in the viewport.
   * @group Props
   */
  keepInViewport = false;
  /**
   * Minimum value for the left coordinate of dialog in dragging.
   * @group Props
   */
  minX;
  /**
   * Minimum value for the top coordinate of dialog in dragging.
   * @group Props
   */
  minY;
  /**
   * Whether the dialog can be displayed full screen.
   * @group Props
   */
  maximizable = false;
  /**
   * Name of the maximize icon.
   * @group Props
   */
  maximizeIcon;
  /**
   * Name of the minimize icon.
   * @group Props
   */
  minimizeIcon;
  /**
   * Position of the dialog, options are "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left" or "bottom-right".
   * @group Props
   */
  position;
  /**
   * Defines a string that labels the close button for accessibility.
   * @group Props
   */
  closeAriaLabel;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @group Props
   */
  appendTo;
  /**
   * A boolean to determine if it can be duplicate.
   * @group Props
   */
  duplicate = false;
  /**
   * Object literal to define widths per screen size.
   * @group Props
   */
  breakpoints;
  /**
   * Dialog templates.
   * @group Props
   */
  templates;
};
var DynamicDialogRef = class {
  constructor() {
  }
  /**
   * Closes dialog.
   * @group Method
   */
  close(result) {
    this._onClose.next(result);
    setTimeout(() => {
      this._onClose.complete();
    }, 1e3);
  }
  /**
   * Destroys the dialog instance.
   * @group Method
   */
  destroy() {
    this._onDestroy.next(null);
  }
  /**
   * Callback to invoke on drag start.
   * @param {MouseEvent} event - Mouse event.
   * @group Method
   */
  dragStart(event) {
    this._onDragStart.next(event);
  }
  /**
   * Callback to invoke on drag end.
   * @param {MouseEvent} event - Mouse event.
   * @group Method
   */
  dragEnd(event) {
    this._onDragEnd.next(event);
  }
  /**
   * Callback to invoke on resize start.
   * @param {MouseEvent} event - Mouse event.
   * @group Method
   */
  resizeInit(event) {
    this._onResizeInit.next(event);
  }
  /**
   * Callback to invoke on resize start.
   * @param {MouseEvent} event - Mouse event.
   * @group Method
   */
  resizeEnd(event) {
    this._onResizeEnd.next(event);
  }
  /**
   * Callback to invoke on dialog is maximized.
   * @param {*} value - Size value.
   * @group Method
   */
  maximize(value) {
    this._onMaximize.next(value);
  }
  _onClose = new Subject();
  /**
   * Event triggered on dialog is closed.
   * @group Events
   */
  onClose = this._onClose.asObservable();
  _onDestroy = new Subject();
  /**
   * Event triggered on dialog instance is destroyed.
   * @group Events
   */
  onDestroy = this._onDestroy.asObservable();
  _onDragStart = new Subject();
  /**
   * Event triggered on drag start.
   * @param {MouseEvent} event - Mouse event.
   * @group Events
   */
  onDragStart = this._onDragStart.asObservable();
  _onDragEnd = new Subject();
  /**
   * Event triggered on drag end.
   * @param {MouseEvent} event - Mouse event.
   * @group Events
   */
  onDragEnd = this._onDragEnd.asObservable();
  _onResizeInit = new Subject();
  /**
   * Event triggered on resize start.
   * @param {MouseEvent} event - Mouse event.
   * @group Events
   */
  onResizeInit = this._onResizeInit.asObservable();
  _onResizeEnd = new Subject();
  /**
   * Event triggered on resize end.
   * @param {MouseEvent} event - Mouse event.
   * @group Events
   */
  onResizeEnd = this._onResizeEnd.asObservable();
  _onMaximize = new Subject();
  /**
   * Event triggered on dialog is maximized.
   * @param {*} value - Size value.
   * @group Events
   */
  onMaximize = this._onMaximize.asObservable();
  /**
   * Event triggered on child component load.
   * @param {*} value - Chi.
   * @group Events
   */
  onChildComponentLoaded = new Subject();
};
var showAnimation = animation([style({
  transform: "{{transform}}",
  opacity: 0
}), animate("{{transition}}", style({
  transform: "none",
  opacity: 1
}))]);
var hideAnimation = animation([animate("{{transition}}", style({
  transform: "{{transform}}",
  opacity: 0
}))]);
var DynamicDialogComponent = class _DynamicDialogComponent extends BaseComponent {
  renderer;
  ddconfig;
  dialogRef;
  zone;
  parentDialog;
  visible = true;
  componentRef;
  mask;
  resizing;
  dragging;
  maximized;
  _style = {};
  originalStyle;
  lastPageX;
  lastPageY;
  ariaLabelledBy;
  id = uuid("pn_id_");
  styleElement;
  insertionPoint;
  maskViewChild;
  contentViewChild;
  footerViewChild;
  headerViewChild;
  childComponentType;
  inputValues;
  container;
  wrapper;
  documentKeydownListener;
  documentEscapeListener;
  maskClickListener;
  transformOptions = "scale(0.7)";
  documentResizeListener;
  documentResizeEndListener;
  documentDragListener;
  documentDragEndListener;
  _componentStyle = inject(DynamicDialogStyle);
  get minX() {
    return this.ddconfig.minX ? this.ddconfig.minX : 0;
  }
  get minY() {
    return this.ddconfig.minY ? this.ddconfig.minY : 0;
  }
  get keepInViewport() {
    return this.ddconfig.keepInViewport;
  }
  get maximizable() {
    return this.ddconfig.maximizable;
  }
  get maximizeIcon() {
    return this.ddconfig.maximizeIcon;
  }
  get minimizeIcon() {
    return this.ddconfig.minimizeIcon;
  }
  get closable() {
    return this.ddconfig.closable;
  }
  get style() {
    return this._style;
  }
  get position() {
    return this.ddconfig.position;
  }
  get defaultCloseAriaLabel() {
    return this.config.getTranslation(TranslationKeys.ARIA)["close"];
  }
  set style(value) {
    if (value) {
      this._style = __spreadValues({}, value);
      this.originalStyle = value;
    }
  }
  get parent() {
    const domElements = Array.from(this.document.getElementsByClassName("p-dialog"));
    if (domElements.length > 1) {
      return domElements.pop();
    }
  }
  get parentContent() {
    const domElements = Array.from(this.document.getElementsByClassName("p-dialog"));
    if (domElements.length > 0) {
      const contentElements = domElements[domElements.length - 1].querySelector(".p-dialog-content");
      if (contentElements) return Array.isArray(contentElements) ? contentElements[0] : contentElements;
    }
  }
  get header() {
    return this.ddconfig.header;
  }
  get data() {
    return this.ddconfig.data;
  }
  get breakpoints() {
    return this.ddconfig.breakpoints;
  }
  get footerTemplate() {
    return this.ddconfig?.templates?.footer;
  }
  get headerTemplate() {
    return this.ddconfig?.templates?.header;
  }
  get contentTemplate() {
    return this.ddconfig?.templates?.content;
  }
  get minimizeIconTemplate() {
    return this.ddconfig?.templates?.minimizeicon;
  }
  get maximizeIconTemplate() {
    return this.ddconfig?.templates?.maximizeicon;
  }
  get closeIconTemplate() {
    return this.ddconfig?.templates?.closeicon;
  }
  get maskClass() {
    const positions = ["left", "right", "top", "topleft", "topright", "bottom", "bottomleft", "bottomright"];
    const pos = positions.find((item) => item === this.position);
    return {
      "p-dialog-mask": true,
      "p-overlay-mask p-overlay-mask-enter": this.ddconfig.modal || this.ddconfig.dismissableMask,
      [`p-dialog-${pos}`]: pos
    };
  }
  get dialogId() {
    return this.attrSelector;
  }
  zIndexForLayering;
  constructor(renderer, ddconfig, dialogRef, zone, parentDialog) {
    super();
    this.renderer = renderer;
    this.ddconfig = ddconfig;
    this.dialogRef = dialogRef;
    this.zone = zone;
    this.parentDialog = parentDialog;
  }
  ngOnInit() {
    super.ngOnInit();
    if (this.breakpoints) {
      this.createStyle();
    }
  }
  createStyle() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.styleElement) {
        this.styleElement = this.renderer.createElement("style");
        this.styleElement.type = "text/css";
        this.renderer.appendChild(this.document.head, this.styleElement);
        let innerHTML = "";
        for (let breakpoint in this.breakpoints) {
          innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[id=${this.dialogId}]:not(.p-dialog-maximized) {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
        }
        this.renderer.setProperty(this.styleElement, "innerHTML", innerHTML);
        setAttribute(this.styleElement, "nonce", this.config?.csp()?.nonce);
      }
    }
  }
  destroyStyle() {
    if (this.styleElement) {
      this.renderer.removeChild(this.document.head, this.styleElement);
      this.styleElement = null;
    }
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.loadChildComponent(this.childComponentType);
    this.ariaLabelledBy = this.getAriaLabelledBy();
    this.cd.detectChanges();
  }
  getAriaLabelledBy() {
    return this.header !== null ? uuid("pn_id_") + "_header" : null;
  }
  loadChildComponent(componentType) {
    let viewContainerRef = this.insertionPoint?.viewContainerRef;
    viewContainerRef?.clear();
    this.componentRef = viewContainerRef?.createComponent(componentType);
    if (this.inputValues) {
      Object.entries(this.inputValues).forEach(([key, value]) => {
        this.componentRef.setInput(key, value);
      });
    }
    this.dialogRef.onChildComponentLoaded.next(this.componentRef.instance);
  }
  moveOnTop() {
    if (this.ddconfig.autoZIndex !== false) {
      zindexutils.set("modal", this.container, (this.ddconfig.baseZIndex || 0) + this.config.zIndex.modal);
      this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
    } else {
      this.zIndexForLayering = zindexutils.generateZIndex("modal", (this.ddconfig.baseZIndex || 0) + this.config.zIndex.modal);
    }
  }
  onAnimationStart(event) {
    switch (event.toState) {
      case "visible":
        this.container = event.element;
        this.wrapper = this.container.parentElement;
        this.moveOnTop();
        if (this.parent) {
          this.unbindGlobalListeners();
        }
        this.bindGlobalListeners();
        this.container?.setAttribute(this.id, "");
        if (this.ddconfig.modal !== false) {
          this.enableModality();
        }
        if (this.ddconfig.focusOnShow !== false) {
          this.focus();
        }
        break;
      case "void":
        if (this.wrapper && this.ddconfig.modal !== false) {
          addClass(this.wrapper, "p-overlay-mask-leave");
        }
        break;
    }
  }
  onAnimationEnd(event) {
    if (event.toState === "void") {
      if (this.parentContent) {
        this.focus(this.parentContent);
      }
      this.onContainerDestroy();
      this.dialogRef.destroy();
    }
  }
  onContainerDestroy() {
    this.unbindGlobalListeners();
    if (this.container && this.ddconfig.autoZIndex !== false) {
      zindexutils.clear(this.container);
    }
    if (this.zIndexForLayering) {
      zindexutils.revertZIndex(this.zIndexForLayering);
    }
    if (this.ddconfig.modal !== false) {
      this.disableModality();
    }
    this.container = null;
  }
  close() {
    this.visible = false;
    this.cd.markForCheck();
  }
  hide() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  enableModality() {
    if (this.ddconfig.dismissableMask) {
      this.maskClickListener = this.renderer.listen(this.wrapper, "mousedown", (event) => {
        if (this.wrapper && this.wrapper.isSameNode(event.target)) {
          this.hide();
        }
      });
    }
    if (this.ddconfig.modal !== false) {
      addClass(this.document.body, "p-overflow-hidden");
    }
  }
  disableModality() {
    if (this.wrapper) {
      if (this.ddconfig.dismissableMask) {
        this.unbindMaskClickListener();
      }
      if (this.ddconfig.modal !== false) {
        removeClass(this.document.body, "p-overflow-hidden");
      }
      if (!this.cd.destroyed) {
        this.cd.detectChanges();
      }
    }
  }
  focus(focusParentElement = this.contentViewChild.nativeElement) {
    let focusable = DomHandler.getFocusableElement(focusParentElement, "[autofocus]");
    if (focusable) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => focusable.focus(), 5);
      });
      return;
    }
    const focusableElement = DomHandler.getFocusableElement(focusParentElement);
    if (focusableElement) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => focusableElement.focus(), 5);
      });
    } else if (this.footerViewChild) {
      this.focus(this.footerViewChild.nativeElement);
    } else if (!focusableElement && this.headerViewChild) {
      this.focus(this.headerViewChild.nativeElement);
    }
  }
  maximize() {
    this.maximized = !this.maximized;
    if (this.maximized) {
      addClass(this.document.body, "p-overflow-hidden");
    } else {
      removeClass(this.document.body, "p-overflow-hidden");
    }
    this.dialogRef.maximize({
      maximized: this.maximized
    });
  }
  initResize(event) {
    if (this.ddconfig.resizable) {
      if (!this.documentResizeListener) {
        this.bindDocumentResizeListeners();
      }
      this.resizing = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
      addClass(this.document.body, "p-unselectable-text");
      this.dialogRef.resizeInit(event);
    }
  }
  onResize(event) {
    if (this.resizing) {
      let deltaX = event.pageX - this.lastPageX;
      let deltaY = event.pageY - this.lastPageY;
      let containerWidth = getOuterWidth(this.container);
      let containerHeight = getOuterHeight(this.container);
      let contentHeight = getOuterHeight(this.contentViewChild.nativeElement);
      let newWidth = containerWidth + deltaX;
      let newHeight = containerHeight + deltaY;
      let minWidth = this.container.style.minWidth;
      let minHeight = this.container.style.minHeight;
      let offset = this.container.getBoundingClientRect();
      let viewport = getViewport();
      let hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);
      if (hasBeenDragged) {
        newWidth += deltaX;
        newHeight += deltaY;
      }
      if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
        this._style.width = newWidth + "px";
        this.container.style.width = this._style.width;
      }
      if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
        this.contentViewChild.nativeElement.style.height = contentHeight + newHeight - containerHeight + "px";
        if (this._style.height) {
          this._style.height = newHeight + "px";
          this.container.style.height = this._style.height;
        }
      }
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
    }
  }
  resizeEnd(event) {
    if (this.resizing) {
      this.resizing = false;
      removeClass(this.document.body, "p-unselectable-text");
      this.dialogRef.resizeEnd(event);
    }
  }
  initDrag(event) {
    if (hasClass(event.target, "p-dialog-header-icon") || hasClass(event.target.parentElement, "p-dialog-header-icon")) {
      return;
    }
    if (this.ddconfig.draggable) {
      this.dragging = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
      this.container.style.margin = "0";
      addClass(this.document.body, "p-unselectable-text");
      this.dialogRef.dragStart(event);
    }
  }
  onDrag(event) {
    if (this.dragging) {
      let containerWidth = getOuterWidth(this.container);
      let containerHeight = getOuterHeight(this.container);
      let deltaX = event.pageX - this.lastPageX;
      let deltaY = event.pageY - this.lastPageY;
      let offset = this.container.getBoundingClientRect();
      let leftPos = offset.left + deltaX;
      let topPos = offset.top + deltaY;
      let viewport = getViewport();
      this.container.style.position = "fixed";
      if (this.keepInViewport) {
        if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
          this._style.left = leftPos + "px";
          this.lastPageX = event.pageX;
          this.container.style.left = leftPos + "px";
        }
        if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
          this._style.top = topPos + "px";
          this.lastPageY = event.pageY;
          this.container.style.top = topPos + "px";
        }
      } else {
        this.lastPageX = event.pageX;
        this.container.style.left = leftPos + "px";
        this.lastPageY = event.pageY;
        this.container.style.top = topPos + "px";
      }
    }
  }
  endDrag(event) {
    if (this.dragging) {
      this.dragging = false;
      removeClass(this.document.body, "p-unselectable-text");
      this.dialogRef.dragEnd(event);
      this.cd.detectChanges();
    }
  }
  resetPosition() {
    this.container.style.position = "";
    this.container.style.left = "";
    this.container.style.top = "";
    this.container.style.margin = "";
  }
  bindDocumentDragListener() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.documentDragListener = this.renderer.listen(this.document, "mousemove", this.onDrag.bind(this));
      });
    }
  }
  bindDocumentDragEndListener() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.documentDragEndListener = this.renderer.listen(this.document, "mouseup", this.endDrag.bind(this));
      });
    }
  }
  unbindDocumentDragEndListener() {
    if (this.documentDragEndListener) {
      this.documentDragEndListener();
      this.documentDragListener = null;
    }
  }
  unbindDocumentDragListener() {
    if (this.documentDragListener) {
      this.documentDragListener();
      this.documentDragListener = null;
    }
  }
  bindDocumentResizeListeners() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.documentResizeListener = this.renderer.listen(this.document, "mousemove", this.onResize.bind(this));
        this.documentResizeEndListener = this.renderer.listen(this.document, "mouseup", this.resizeEnd.bind(this));
      });
    }
  }
  unbindDocumentResizeListeners() {
    if (this.documentResizeListener && this.documentResizeEndListener) {
      this.documentResizeListener();
      this.documentResizeEndListener();
      this.documentResizeListener = null;
      this.documentResizeEndListener = null;
    }
  }
  bindGlobalListeners() {
    if (this.ddconfig.closeOnEscape !== false) {
      this.bindDocumentEscapeListener();
    }
    if (this.ddconfig.resizable) {
      this.bindDocumentResizeListeners();
    }
    if (this.ddconfig.draggable) {
      this.bindDocumentDragListener();
      this.bindDocumentDragEndListener();
    }
  }
  unbindGlobalListeners() {
    this.unbindDocumentEscapeListener();
    this.unbindDocumentResizeListeners();
    this.unbindDocumentDragListener();
    this.unbindDocumentDragEndListener();
  }
  bindDocumentEscapeListener() {
    const documentTarget = this.maskViewChild ? this.maskViewChild.nativeElement.ownerDocument : "document";
    this.documentEscapeListener = this.renderer.listen(documentTarget, "keydown", (event) => {
      if (event.which == 27) {
        const currentZIndex = zindexutils.getCurrent();
        if (parseInt(this.container.style.zIndex) == currentZIndex || this.zIndexForLayering == currentZIndex) {
          this.hide();
        }
      }
    });
  }
  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
  }
  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }
  ngOnDestroy() {
    this.onContainerDestroy();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.destroyStyle();
    super.ngOnDestroy();
  }
  static ɵfac = function DynamicDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DynamicDialogComponent)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DynamicDialogConfig), ɵɵdirectiveInject(DynamicDialogRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(_DynamicDialogComponent, 12));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _DynamicDialogComponent,
    selectors: [["p-dynamicDialog"], ["p-dynamicdialog"], ["p-dynamic-dialog"]],
    viewQuery: function DynamicDialogComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(DynamicDialogContent, 5);
        ɵɵviewQuery(_c0, 5);
        ɵɵviewQuery(_c1, 5);
        ɵɵviewQuery(_c2, 5);
        ɵɵviewQuery(_c3, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.insertionPoint = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.maskViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerViewChild = _t.first);
      }
    },
    features: [ɵɵProvidersFeature([DynamicDialogStyle]), ɵɵInheritDefinitionFeature],
    decls: 3,
    vars: 9,
    consts: [["mask", ""], ["container", ""], ["content", ""], ["titlebar", ""], ["footer", ""], [3, "ngStyle", "ngClass"], ["role", "dialog", "pFocusTrap", "", 3, "ngClass", "ngStyle", "style", "class", "pFocusTrapDisabled", "width", "height", 4, "ngIf"], ["role", "dialog", "pFocusTrap", "", 3, "ngClass", "ngStyle", "pFocusTrapDisabled"], ["style", "z-index: 90;", 3, "ngClass", "mousedown", 4, "ngIf"], [3, "ngClass", "mousedown", 4, "ngIf"], [3, "ngClass", "ngStyle"], [4, "ngIf"], [4, "ngComponentOutlet"], [3, "ngClass", 4, "ngIf"], [2, "z-index", "90", 3, "mousedown", "ngClass"], [3, "mousedown", "ngClass"], [3, "ngClass", "id"], [3, "ngClass"], ["rounded", "", "text", "", 3, "styleClass", "tabindex", "onClick", "keydown.enter", 4, "ngIf"], ["rounded", "", "text", "", "severity", "secondary", 3, "styleClass", "ariaLabel", "onClick", "keydown.enter", 4, "ngIf"], ["rounded", "", "text", "", 3, "onClick", "keydown.enter", "styleClass", "tabindex"], [4, "ngTemplateOutlet"], ["rounded", "", "text", "", "severity", "secondary", 3, "onClick", "keydown.enter", "styleClass", "ariaLabel"], ["pDynamicDialogContent", ""]],
    template: function DynamicDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 5, 0);
        ɵɵtemplate(2, DynamicDialogComponent_div_2_Template, 9, 30, "div", 6);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.ddconfig.maskStyleClass);
        ɵɵproperty("ngStyle", ɵɵpureFunction3(5, _c4, ctx.position === "left" || ctx.position === "topleft" || ctx.position === "bottomleft" ? "flex-start" : ctx.position === "right" || ctx.position === "topright" || ctx.position === "bottomright" ? "flex-end" : "center", ctx.position === "top" || ctx.position === "topleft" || ctx.position === "topright" ? "flex-start" : ctx.position === "bottom" || ctx.position === "bottomleft" || ctx.position === "bottomright" ? "flex-end" : "center", ctx.ddconfig.modal ? "auto" : "none"))("ngClass", ctx.maskClass);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.visible);
      }
    },
    dependencies: [CommonModule, NgClass, NgComponentOutlet, NgIf, NgTemplateOutlet, NgStyle, SharedModule, DynamicDialogContent, WindowMaximizeIcon, WindowMinimizeIcon, TimesIcon, Button, FocusTrap],
    encapsulation: 2,
    data: {
      animation: [trigger("animation", [transition("void => visible", [useAnimation(showAnimation)]), transition("visible => void", [useAnimation(hideAnimation)])])]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DynamicDialogComponent, [{
    type: Component,
    args: [{
      selector: "p-dynamicDialog, p-dynamicdialog, p-dynamic-dialog",
      standalone: true,
      imports: [CommonModule, SharedModule, DynamicDialogContent, WindowMaximizeIcon, WindowMinimizeIcon, TimesIcon, Button, FocusTrap],
      template: `
        <div
            #mask
            [ngStyle]="{
                position: 'fixed',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                display: 'flex',
                'justify-content': position === 'left' || position === 'topleft' || position === 'bottomleft' ? 'flex-start' : position === 'right' || position === 'topright' || position === 'bottomright' ? 'flex-end' : 'center',
                'align-items': position === 'top' || position === 'topleft' || position === 'topright' ? 'flex-start' : position === 'bottom' || position === 'bottomleft' || position === 'bottomright' ? 'flex-end' : 'center',
                'pointer-events': ddconfig.modal ? 'auto' : 'none'
            }"
            [class]="ddconfig.maskStyleClass"
            [ngClass]="maskClass"
        >
            <div
                *ngIf="visible"
                #container
                [ngClass]="{ 'p-dialog p-component': true, 'p-dialog-maximized': maximizable && maximized }"
                [ngStyle]="{ display: 'flex', 'flex-direction': 'column', 'pointer-events': 'auto' }"
                [style]="ddconfig.style"
                [class]="ddconfig.styleClass"
                [@animation]="{
                    value: 'visible',
                    params: {
                        transform: transformOptions,
                        transition: ddconfig.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'
                    }
                }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                pFocusTrap
                [pFocusTrapDisabled]="ddconfig.focusTrap === false"
                [style.width]="ddconfig.width"
                [style.height]="ddconfig.height"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-modal]="true"
                [attr.id]="dialogId"
            >
                <div *ngIf="ddconfig.resizable" [ngClass]="'p-resizable-handle'" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                <div #titlebar [ngClass]="'p-dialog-header'" (mousedown)="initDrag($event)" *ngIf="ddconfig.showHeader !== false">
                    <ng-container *ngComponentOutlet="headerTemplate"></ng-container>
                    <ng-container *ngIf="!headerTemplate">
                        <span [ngClass]="'p-dialog-title'" [id]="ariaLabelledBy">{{ ddconfig.header }}</span>
                        <div [ngClass]="'p-dialog-header-actions'">
                            <p-button *ngIf="ddconfig.maximizable" [styleClass]="'p-dialog-maximize-button'" (onClick)="maximize()" (keydown.enter)="maximize()" rounded text [tabindex]="maximizable ? '0' : '-1'">
                                <ng-container *ngIf="!maximizeIcon">
                                    <WindowMaximizeIcon *ngIf="!maximized && !maximizeIconTemplate" />
                                    <WindowMinimizeIcon *ngIf="maximized && !minimizeIconTemplate" />
                                </ng-container>
                                <ng-container *ngIf="!maximized">
                                    <ng-template *ngTemplateOutlet="maximizeIconTemplate"></ng-template>
                                </ng-container>
                                <ng-container *ngIf="maximized">
                                    <ng-template *ngTemplateOutlet="minimizeIconTemplate"></ng-template>
                                </ng-container>
                            </p-button>
                            <p-button *ngIf="closable" [styleClass]="'p-dialog-close-button'" [ariaLabel]="ddconfig.closeAriaLabel || defaultCloseAriaLabel" (onClick)="hide()" (keydown.enter)="hide()" rounded text severity="secondary">
                                <ng-container *ngIf="!closeIconTemplate">
                                    <TimesIcon />
                                </ng-container>
                                <span *ngIf="closeIconTemplate">
                                    <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                </span>
                            </p-button>
                        </div>
                    </ng-container>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="ddconfig.contentStyle">
                    <ng-template pDynamicDialogContent *ngIf="!contentTemplate"></ng-template>
                    <ng-container *ngComponentOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer [ngClass]="'p-dialog-footer'" *ngIf="ddconfig.footer || footerTemplate">
                    <ng-container *ngIf="!footerTemplate">
                        {{ ddconfig.footer }}
                    </ng-container>
                    <ng-container *ngComponentOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
      animations: [trigger("animation", [transition("void => visible", [useAnimation(showAnimation)]), transition("visible => void", [useAnimation(hideAnimation)])])],
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation.None,
      providers: [DynamicDialogStyle]
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: DynamicDialogConfig
  }, {
    type: DynamicDialogRef
  }, {
    type: NgZone
  }, {
    type: DynamicDialogComponent,
    decorators: [{
      type: SkipSelf
    }, {
      type: Optional
    }]
  }], {
    insertionPoint: [{
      type: ViewChild,
      args: [DynamicDialogContent]
    }],
    maskViewChild: [{
      type: ViewChild,
      args: ["mask"]
    }],
    contentViewChild: [{
      type: ViewChild,
      args: ["content"]
    }],
    footerViewChild: [{
      type: ViewChild,
      args: ["footer"]
    }],
    headerViewChild: [{
      type: ViewChild,
      args: ["titlebar"]
    }]
  });
})();
var DynamicDialogModule = class _DynamicDialogModule {
  static ɵfac = function DynamicDialogModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DynamicDialogModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DynamicDialogModule,
    imports: [DynamicDialogComponent, SharedModule],
    exports: [DynamicDialogComponent, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [DynamicDialogComponent, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DynamicDialogModule, [{
    type: NgModule,
    args: [{
      imports: [DynamicDialogComponent, SharedModule],
      exports: [DynamicDialogComponent, SharedModule]
    }]
  }], null, null);
})();
var DynamicDialogInjector = class {
  _parentInjector;
  _additionalTokens;
  constructor(_parentInjector, _additionalTokens) {
    this._parentInjector = _parentInjector;
    this._additionalTokens = _additionalTokens;
  }
  get(token, notFoundValue, options) {
    const value = this._additionalTokens.get(token);
    if (value) return value;
    return this._parentInjector.get(token, notFoundValue);
  }
};
var DialogService = class _DialogService {
  appRef;
  injector;
  document;
  dialogComponentRefMap = /* @__PURE__ */ new Map();
  constructor(appRef, injector, document) {
    this.appRef = appRef;
    this.injector = injector;
    this.document = document;
  }
  /**
   * Displays the dialog using the dynamic dialog object options.
   * @param {*} componentType - Dynamic component for content template.
   * @param {DynamicDialogConfig} config - DynamicDialog object.
   * @returns {DynamicDialogRef} DynamicDialog instance.
   * @group Method
   */
  open(componentType, config) {
    if (!this.duplicationPermission(componentType, config)) {
      return null;
    }
    const dialogRef = this.appendDialogComponentToBody(config, componentType);
    this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;
    this.dialogComponentRefMap.get(dialogRef).instance.inputValues = config.inputValues;
    return dialogRef;
  }
  /**
   * Returns the dynamic dialog component instance.
   * @param {ref} DynamicDialogRef - DynamicDialog instance.
   * @group Method
   */
  getInstance(ref) {
    return this.dialogComponentRefMap.get(ref).instance;
  }
  appendDialogComponentToBody(config, componentType) {
    const map = /* @__PURE__ */ new WeakMap();
    map.set(DynamicDialogConfig, config);
    const dialogRef = new DynamicDialogRef();
    map.set(DynamicDialogRef, dialogRef);
    const sub = dialogRef.onClose.subscribe(() => {
      this.dialogComponentRefMap.get(dialogRef).instance.close();
    });
    const destroySub = dialogRef.onDestroy.subscribe(() => {
      this.removeDialogComponentFromBody(dialogRef);
      destroySub.unsubscribe();
      sub.unsubscribe();
    });
    const componentRef = createComponent(DynamicDialogComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: new DynamicDialogInjector(this.injector, map)
    });
    this.appRef.attachView(componentRef.hostView);
    const domElem = componentRef.hostView.rootNodes[0];
    if (!config.appendTo || config.appendTo === "body") {
      this.document.body.appendChild(domElem);
    } else {
      appendChild(config.appendTo, domElem);
    }
    this.dialogComponentRefMap.set(dialogRef, componentRef);
    return dialogRef;
  }
  removeDialogComponentFromBody(dialogRef) {
    if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
      return;
    }
    const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
    dialogComponentRef.changeDetectorRef.detectChanges();
    this.dialogComponentRefMap.delete(dialogRef);
  }
  duplicationPermission(componentType, config) {
    if (config.duplicate) {
      return true;
    }
    let permission = true;
    for (const [key, value] of this.dialogComponentRefMap) {
      if (value.instance.childComponentType === componentType) {
        permission = false;
        break;
      }
    }
    return permission;
  }
  static ɵfac = function DialogService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DialogService)(ɵɵinject(ApplicationRef), ɵɵinject(Injector), ɵɵinject(DOCUMENT));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _DialogService,
    factory: _DialogService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DialogService, [{
    type: Injectable
  }], () => [{
    type: ApplicationRef
  }, {
    type: Injector
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
export {
  DialogService,
  DynamicDialogClasses,
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogInjector,
  DynamicDialogModule,
  DynamicDialogRef,
  DynamicDialogStyle
};
//# sourceMappingURL=primeng_dynamicdialog.js.map
