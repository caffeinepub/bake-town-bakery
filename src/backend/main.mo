import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types and Comparison Functions
  type Category = {
    #cakes;
    #pastries;
    #fastFood;
  };

  module Category {
    public func compare(category1 : Category, category2 : Category) : Order.Order {
      switch (category1, category2) {
        case (#cakes, #cakes) { #equal };
        case (#cakes, _) { #less };
        case (#fastFood, #fastFood) { #equal };
        case (#fastFood, _) { #greater };
        case (#pastries, #cakes) { #greater };
        case (#pastries, #pastries) { #equal };
        case (#pastries, #fastFood) { #less };
      };
    };
  };

  public type MenuItem = {
    id : Nat;
    name : Text;
    category : Category;
    price : Text;
    description : Text;
    imageUrl : Text;
    isAvailable : Bool;
  };

  module MenuItem {
    public func compare(menuItem1 : MenuItem, menuItem2 : MenuItem) : Order.Order {
      Nat.compare(menuItem1.id, menuItem2.id);
    };
  };

  public type SiteSettings = {
    tagline : Text;
    aboutText : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // State
  let menuItems = Map.empty<Nat, MenuItem>();
  var nextId = 0;
  var siteSettings : SiteSettings = {
    tagline = "Baketown - Where fresh bakes and fast food meet!";
    aboutText = "Welcome to Baketown Bakery!";
  };
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Helper Functions
  func getNextId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  func getMenuItemInternal(id : Nat) : MenuItem {
    switch (menuItems.get(id)) {
      case (null) { Runtime.trap("Menu item does not exist") };
      case (?item) { item };
    };
  };

  // Restrict access to admin only
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Menu Management
  public query func getAllMenuItems() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public query func getMenuItemsByCategory(category : Category) : async [MenuItem] {
    menuItems.values().toArray().sort().filter(func(item) { item.category == category });
  };

  public query func getMenuItem(id : Nat) : async MenuItem {
    getMenuItemInternal(id);
  };

  public shared ({ caller }) func addMenuItem(menuItem : MenuItem) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add menu items");
    };
    let id = getNextId();
    let newItem : MenuItem = {
      menuItem with
      id;
    };
    menuItems.add(id, newItem);
    id;
  };

  public shared ({ caller }) func updateMenuItem(id : Nat, menuItem : MenuItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update menu items");
    };
    if (not menuItems.containsKey(id)) {
      Runtime.trap("Menu item does not exist");
    };
    let updatedItem : MenuItem = {
      menuItem with
      id;
    };
    menuItems.add(id, updatedItem);
  };

  public shared ({ caller }) func deleteMenuItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete menu items");
    };
    if (not menuItems.containsKey(id)) {
      Runtime.trap("Menu item does not exist");
    };
    menuItems.remove(id);
  };

  // Site Settings
  public query func getSiteSettings() : async SiteSettings {
    siteSettings;
  };

  public shared ({ caller }) func updateSiteSettings(settings : SiteSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site settings");
    };
    siteSettings := settings;
  };

  // Seed sample data on first deploy
  system func preupgrade() {};

  system func postupgrade() {
    if (menuItems.isEmpty()) {
      // Cakes
      let cake1 : MenuItem = {
        id = getNextId();
        name = "Chocolate Cake";
        category = #cakes;
        price = "15.00";
        description = "Rich and moist chocolate cake";
        imageUrl = "/images/chocolate_cake.jpg";
        isAvailable = true;
      };
      menuItems.add(cake1.id, cake1);

      let cake2 : MenuItem = {
        id = getNextId();
        name = "Vanilla Sponge";
        category = #cakes;
        price = "12.00";
        description = "Light and fluffy vanilla sponge cake";
        imageUrl = "/images/vanilla_sponge.jpg";
        isAvailable = true;
      };
      menuItems.add(cake2.id, cake2);

      let cake3 : MenuItem = {
        id = getNextId();
        name = "Red Velvet";
        category = #cakes;
        price = "18.00";
        description = "Classic red velvet with cream cheese frosting";
        imageUrl = "/images/red_velvet.jpg";
        isAvailable = true;
      };
      menuItems.add(cake3.id, cake3);

      // Pastries
      let pastry1 : MenuItem = {
        id = getNextId();
        name = "Croissant";
        category = #pastries;
        price = "3.00";
        description = "Buttery flaky croissant";
        imageUrl = "/images/croissant.jpg";
        isAvailable = true;
      };
      menuItems.add(pastry1.id, pastry1);

      let pastry2 : MenuItem = {
        id = getNextId();
        name = "Danish";
        category = #pastries;
        price = "4.00";
        description = "Fruit-filled Danish pastry";
        imageUrl = "/images/danish.jpg";
        isAvailable = true;
      };
      menuItems.add(pastry2.id, pastry2);

      let pastry3 : MenuItem = {
        id = getNextId();
        name = "Eclair";
        category = #pastries;
        price = "5.00";
        description = "Cream-filled chocolate eclair";
        imageUrl = "/images/eclair.jpg";
        isAvailable = true;
      };
      menuItems.add(pastry3.id, pastry3);

      // Fast Food
      let fastFood1 : MenuItem = {
        id = getNextId();
        name = "Burger";
        category = #fastFood;
        price = "8.00";
        description = "Juicy beef burger";
        imageUrl = "/images/burger.jpg";
        isAvailable = true;
      };
      menuItems.add(fastFood1.id, fastFood1);

      let fastFood2 : MenuItem = {
        id = getNextId();
        name = "Fries";
        category = #fastFood;
        price = "3.00";
        description = "Crispy golden fries";
        imageUrl = "/images/fries.jpg";
        isAvailable = true;
      };
      menuItems.add(fastFood2.id, fastFood2);

      let fastFood3 : MenuItem = {
        id = getNextId();
        name = "Pizza Slice";
        category = #fastFood;
        price = "5.00";
        description = "Cheesy pizza slice";
        imageUrl = "/images/pizza_slice.jpg";
        isAvailable = true;
      };
      menuItems.add(fastFood3.id, fastFood3);
    };
  };
};
