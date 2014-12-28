// Populate database with default list of tags if none exist for whatever reason

//Tags._dropCollection();
if (Tags.find().count() === 0) {
  Tags.insert({
    tier: 'tag',
    name: 'municipal',
    excerpt: 'Water use and consumption in cities and towns including residential and industrial uses',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'drinking water and waste water',
    excerpt: 'Drinking water supply and treatment; wastewater treatment and recycling.',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'agriculture',
    excerpt: 'The effects of fertilizer and pesticide runoff on nearby water from farming, livestock production, and hydroponic land uses',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'aquatic life',
    excerpt: 'Organisms found living near or in the water such as algae, microorganisms, protozoans, plants, fungus, invertebrates and vertebrates (fish, sharks, rays, skates, amphibians, reptiles, mammals and birds)',
    count: 0
  });
  
  Tags.insert({
    tier: 'tag',    
    name: 'climate change',
    excerpt: 'Issues like sea level rise, ocean acidification, storm frequency and intensity, ice melts and droughts',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'development',
    excerpt: 'Habitat destruction of land near bodies of water during development of housing, commercial and industrial properties that affect water quality, aquatic life and result in the rerouting of waterways (dams, dikes, etc.)',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'ecosystem',
    excerpt: 'An entity (stream, river, pond, temporary pond, lake, reservoir, river, wetland, marsh, tidal creek, estuary, beach, reef and open ocean) that sustains life, and is made up of living and nonliving things, has energy flowing through it, and maintains nutrient cycles',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'resources and management',
    excerpt: 'Sources of water, such as surface water (reservoirs,lakes, rivers, streams) and groundwater (aquifers); and water allocation (planning and developing methods for water distribution)',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'sustainability and conservation',
    excerpt: 'Practices used to minimize water use and contamination such as in household consumption, rainwater collection (rain barrels), xeric landscaping and irrigation techniques',
        count: 0
  });
  Tags.insert({
    tier: 'tag',
    name: 'public health',
    excerpt: 'Health concerns relating to contaminated drinking and swimming water such as exposure to contaminants like chemicals, toxins, metals, pesticides, pharmaceuticals, and harmful microorganisms.',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'pollution',
    excerpt: 'Contamination of water from bacteria, microorganisms, garbage, sewage, toxins, industrial waste, chemicals, pharmaceuticals, petroleum products, fertilizers and sediments.',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'fish kills and algae blooms',
    excerpt: 'Excessive nutrient runoff (fertilizers and wastewater) that is responsible for stimulating algae growth (algae blooms), which indirectly results in a decrease in oxygen levels in the water, causing fish to suffocate and die. Some algae produce toxins that may be considered harmful to animals (including humans) and are referred to as Harmful Algae Blooms (HABs).',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'fisheries and aquaculture',
    excerpt: 'Commercial and recreational fish and shellfish information such as bycatch reduction techniques, sustainable fishing and seafood choices, catch limits (quotas), size and seasonal restrictions, fish and shellfish public health advisories, stock assessments, migratory information, tagging studies and water quality effects of fish farming (aquaculture).',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'recreation',
    excerpt: 'Sports and activities involving water such as fishing, boating, water skiing, wakeboarding, paddle boarding, scuba diving, snorkeling, surfing and swimming.',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'research and education',
    excerpt: 'Research on any aspect of water; and education and outreach programs that address water-related topics.',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'technology and innovation',
    excerpt: 'Techniques involving desalination, seawater water intrusion, fouling and other innovative technologies that address water use, efficiency, delivery and treatment.',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'industrial',
    excerpt: 'The effects of industrial waste and water consumption on neighboring bodies of water.',
    count: 0    
  });
  Tags.insert({
    tier: 'tag',    
    name: 'navigation',
    excerpt: 'The transportation of goods via ships through waterways; issues such as dredging, animal encounters (protected whales and manatees), discharges and released pollution from vessels, and possible introduction of invasive species in released ballast water.',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'hydropower',
    excerpt: 'Includes any energy that is harnessed from water (hydroelectric,tidal power) or the use of water for cooling towers (nuclear). Effects on water supply and flow include but are not limited to interruption of water flow from dams and their affect on aquatic life, flooding from rerouted waterways, and temperature fluctuation of released or blocked water flow.',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'storms & devastation',
    excerpt: 'Flooding, hurricanes, wave surges, tsunamis, sinkholes, droughts, blizzards and hard freezes.',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'water conflicts',
    excerpt: 'water wars, municipal conflicts, water rights and equity over water access.',
    count: 0
  });
  Tags.insert({
    tier: 'tag',    
    name: 'water monitoring',
    excerpt: 'Biological (i.e., chlorophyll or fecal coliform studies), chemical (i.e., pH, dissolved oxygen, carbon dioxide, conductivity, and salinity levels), and physical (i.e., temperature, turbidity, depth, and flow) characteristics of water',
    count: 0
  }); 
  
  /* bodies of water */
  Tags.insert({
    tier: 'body',
    name: 'rivers',
    excerpt: 'a large natural stream of water flowing in a channel to the sea, a lake, or another such stream',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'lakes',
    excerpt: 'a large body of water surrounded by land',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'reservoirs',
    excerpt: 'a large natural or artificial lake used as a source of water supply',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'streams',
    excerpt: 'a small, narrow river',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'wetlands',
    excerpt: 'land consisting of marshes or swamps; saturated land',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'temporary ponds',
    excerpt: 'Temporary ponds and puddles are by and large neglected ecosystems and generally undervalued till recently',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'tidal creeks',
    excerpt: 'A tidal creek, tidal channel, or estuary is the portion of a stream that is affected by ebb and flow of ocean tides, in the case that the subject stream discharges to an ocean, sea or strait.',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'estuaries',
    excerpt: 'the tidal mouth of a large river, where the tide meets the stream',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'marsh',
    excerpt: 'An area of low-lying land that is flooded in wet seasons or at high tide, and typically remains waterlogged at all times',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'beach',
    excerpt: 'a pebbly or sandy shore, especially by the ocean between high- and low-water marks',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'reef',
    excerpt: 'A ridge of jagged rock, coral, or sand just above or below the surface of the sea',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'coastline',
    excerpt: 'the outline of a coast, especially with regard to its shape and appearance',
    count: 0
  });
  Tags.insert({
    tier: 'body',
    name: 'open ocean',
    excerpt: 'Any water in a sea or lake that is neither close to the bottom nor near the shore can be said to be in the pelagic zone',
    count: 0
  });

  /* Types of water projects 
  Tags.insert({
    tier: 'type',    
    name: 'challenge',
    excerpt: 'A call to take part in a contest or competition to help a water-related cause',
    count: 0
  });  
  Tags.insert({
    tier: 'type',    
    name: 'resource',
    excerpt: 'An action or strategy that may be adopted in adverse water-related circumstances, such as flooding',
    count: 0
  });    
  Tags.insert({
    tier: 'type',    
    name: 'solution',
    excerpt: 'A means of solving a water problem or dealing with a difficult situation involving water',
    count: 0
  });    
  */
}