from mixpanel import Mixpanel #Tested with Mixpanel Python SDK v4.10.0: https://docs.mixpanel.com/docs/tracking/reference/python

class MixpanelDestination:
  # This method is optional, you can skip it if you've already initialized the Mixpanel SDK   
  def make(self, env, apiKey):
    self.mp = Mixpanel(apiKey)

  def track_event(self, user_id, event_name, event_properties):
    self.mp.track(user_id, event_name, event_properties)

  def set_user_properties(self, user_id, user_properties):
    self.mp.people_set(user_id, user_properties)

  def log_page(self, user_id, page_name, event_properties):
    # Note: Mixpanel does not provide a native method for page or screen tracking, so we send an event instead. Other SDKs may have a dedicated page tracking method.
    event_properties["Page Name"] = page_name
    self.mp.track(user_id, "Page Viewed", event_properties)

  def revenue(self, user_id, amount, event_properties):
    self.mp.people_track_charge(user_id, amount, event_properties)

  # The following methods are used for group analytics and are not required
  def add_current_user_to_group(self, user_id, group_type, group_id, group_properties):
    self.mp.people_set(user_id, { group_type : group_id })
    self.mp.group_set(group_type, group_id, group_properties)

  def set_group_properties(self, group_type, group_id, group_properties):
    self.mp.group_set(group_type, group_id, group_properties)

  def track_event_with_groups(self, user_id, event_name, event_properties, group_types_to_group_ids):
    for group_type in group_types_to_group_ids:
        event_properties[group_type] = group_types_to_group_ids[group_type]
    self.mp.track(user_id, event_name, event_properties)

# Finally initialize Avo with the Mixpanel destination
# import avo # Import the Avo Codegen file
# avo.init_avo({"env": "dev"}, {"my_system_property": "a-value"}, MixpanelDestination())

