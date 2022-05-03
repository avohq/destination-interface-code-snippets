# Example: Destination interface for the Segment SDK. Replace the Segment implementation with your own tracking SDK methods
# Segment Docs: https://segment.com/docs/connections/sources/catalog/libraries/server/php/

require_once("/path/to/analytics-php/lib/Segment.php");
use Segment\Segment;

class SegmentDestination {

    # This method is optional, you can skip it if you've already initialized your Analytics SDK
    function make($stub, $apiKey){
      class_alias('Segment', 'Analytics');
      Segment::init($apiKey);
    }

    function log_event($user_id, $name, $properties){
      Segment::track(array(
        "userId" => $user_id,
        "event" => $name,
        "properties" => $properties
      ));
    }

    function set_user_properties($user_id, $array){
      Segment::identify(array(
        "userId" => $user_id,
        "traits" => $array
      ));
    }

    function log_page($user_id, $page_name, $event_properties){
      Segment::page(array(
        "userId" => $user_id,
        "name" => $page_name,
        "properties" => $event_properties
      ));
    }
    
    function revenue($userId, $amount, $event_properties){
      $event_properties["amount"] = $amount;
      Segment::track(array(
        "userId" => $user_id,
        "event" => "Revenue",
        "properties" => $event_properties
      ));
    }
}
