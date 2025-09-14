import { Injectable } from '@angular/core';

export class Settings {
  constructor(public name: string,
              public theme: string,
              public rtl: boolean,
              public adminSidenavIsOpened: boolean,
              public adminSidenavIsPinned: boolean,
              public adminSidenavUserBlock: boolean,
              public mainToolbarFixed: boolean) { }
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings = new Settings(
    'Emporium',  // theme name
    'black',     // green, blue, red, pink, purple, grey, black
    false,       // true = rtl, false = ltr
    true,        // adminSidenavIsOpened
    true,        // adminSidenavIsPinned 
    true,        // adminSidenavUserBlock 
    false        // mainToolbarFixed
  )

  constructor() { }
}
