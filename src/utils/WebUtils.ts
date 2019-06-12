// FB SDK
export interface FbSDK {
  AppEvents: FbSDK_AppEvents;
  Canvas: Phaser.Renderer.Canvas.CanvasRenderer;
  Event: any;
  Frictionless: any;
  XFBML: any;
  api: Function;
  getAccessToken: Function;
  getAuthResponse: Function;
  getLoginStatus: Function;
  getUserID: Function;
  init: Function;
  login: Function;
  logout: Function;
  ui: Function;
}

export interface FbSDK_AppEvents {
  EventNames: Map<FbSDK_AppEventNames, string>;
}

export enum FbSDK_AppEventNames {
  ACHIEVED_LEVEL = 'fb_mobile_level_achieved',
  ADDED_PAYMENT_INFO = 'fb_mobile_add_payment_info',
  ADDED_TO_CART = 'fb_mobile_add_to_cart',
  ADDED_TO_WISHLIST = 'fb_mobile_add_to_wishlist',
  COMPLETED_REGISTRATION = 'fb_mobile_complete_registration',
  COMPLETED_TUTORIAL = 'fb_mobile_tutorial_completion',
  INITIATED_CHECKOUT = 'fb_mobile_initiated_checkout',
  PAGE_VIEW = 'fb_page_view',
  RATED = 'fb_mobile_rate',
  SEARCHED = 'fb_mobile_search',
  SPENT_CREDITS = 'fb_mobile_spent_credits',
  UNLOCKED_ACHIEVEMENT = 'fb_mobile_achievement_unlocked',
  VIEWED_CONTENT = 'fb_mobile_content_view',
}
