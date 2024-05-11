const routeCoordinates = [
  [108.20154068615591, -7.335682808090652],
  [108.202423143803, -7.335761381611476],
  [108.20379366085876, -7.335741785748624],
  [108.20508048137259, -7.335669735571756],
  [108.20523729719014, -7.335662681057116],
  [108.20546726964602, -7.334693113209468],
  [108.20553883307974, -7.334277582795181],
  [108.2059231122281, -7.3325296155835815],
  [108.20609635451416, -7.331975682328505],
  [108.20664271083155, -7.330576310618952],
  [108.20664200381606, -7.330575656558324],
  [108.20669681174905, -7.3302677977519295],
  [108.20670854026406, -7.329724783591502],
  [108.2068303785922, -7.328501344151135],
  [108.20687508839512, -7.3283223846770085],
  [108.20781617933682, -7.326516777210742],
  [108.20796581450503, -7.326232608259616],
  [108.20828225877426, -7.325361996957795],
  [108.21202937353831, -7.326797649563218],
  [108.21209592813835, -7.327781773133665],
  [108.21207087955997, -7.327838593225707],
  [108.21200422884431, -7.327879887329033],
  [108.21190285302475, -7.327893840345382],
  [108.21135093247347, -7.327853544012797],
  [108.21132886660848, -7.327911517282288],
  [108.2113473258155, -7.328097146424042],
  [108.21141253890812, -7.328295487306804],
  [108.21145025543916, -7.328300466947795],
  [108.21150856698313, -7.328327492924942],
  [108.21166434202974, -7.328464471808957],
  [108.212158152614, -7.328582672490569],
  [108.2123815816775, -7.328608114603483],
  [108.21255731925305, -7.328645402287847],
  [108.21260596755548, -7.328681502312961],
  [108.21262411093471, -7.328720957737971],
  [108.21250669133241, -7.329870977525374],
  [108.21251984993393, -7.330133814151949],
  [108.21206398558212, -7.330444722110215],
  [108.21203199937628, -7.330509034881828],
  [108.21196744306019, -7.330927881957209],
  [108.2117806872829, -7.331555615835313],
  [108.2116748590941, -7.332655537398779],
  [108.21166253162966, -7.332675568643268],
  [108.21160954367133, -7.332726839786432],
  [108.21142973909338, -7.332782148026183],
  [108.21140905149116, -7.332801533526677],
  [108.21137476495727, -7.332898705523931],
  [108.21137142802962, -7.332932045742169],
  [108.21138774893018, -7.3331930013522],
  [108.21158136695664, -7.3340962154410505],
  [108.21201960215484, -7.333754688238116],
  [108.21261620087546, -7.333600677250715],
  [108.21338905926376, -7.333507270642627],
  [108.21380695760462, -7.333491502275024],
  [108.21467543553143, -7.3335242894076345],
  [108.21512408840971, -7.333563266097769],
  [108.21523753900573, -7.33312495659635],
  [108.2153589391998, -7.332764347671713],
  [108.21580724276299, -7.331958294577149],
  [108.21616480862286, -7.332045366141287],
  [108.21926954245987, -7.332547087993703],
  [108.21895920462805, -7.3342782143121354],
  [108.2189894879258, -7.334294961507865],
  [108.21900692246487, -7.334321368590025],
  [108.2190051514878, -7.334359772608494],
  [108.21898028866815, -7.334389653745646],
  [108.21897567399617, -7.334394593206653],
  [108.21825789215927, -7.33883722735446],
  [108.2181610646615, -7.339493020640859],
  [108.21809917840784, -7.339744129196944],
  [108.21754704777283, -7.342941875448034],
  [108.21756744116806, -7.343141796061147],
  [108.21754632006605, -7.34363330751485],
  [108.21776605794321, -7.3459090724008576],
  [108.21779417106825, -7.346507414248848],
  [108.21775452450953, -7.348279879182343],
  [108.21773503112797, -7.348611889262017],
  [108.21858292706514, -7.348609665975445],
  [108.22256906120703, -7.348968493349588],
  [108.22348419211033, -7.348977960597594],
  [108.22390441243488, -7.348933694655528],
  [108.22573109344034, -7.348718308060029],
  [108.22672364150372, -7.348478525287021],
  [108.22703791888614, -7.348436148344263],
  [108.22756582401416, -7.348452511700671],
  [108.22784755374755, -7.348428013824233],
  [108.2279544570203, -7.3483361791263775],
  [108.22799145844635, -7.348209673214754],
  [108.22802178529355, -7.347825539579716],
  [108.22802618425311, -7.347245466487237],
  [108.22801227643816, -7.347145515512736],
  [108.22798024538423, -7.34701181389498],
  [108.22790911353036, -7.346862133640769],
  [108.2278305106301, -7.3467267656290005],
  [108.22774688414353, -7.346540180574294],
  [108.22768620097855, -7.346364555885103],
  [108.2276377760374, -7.3461460198190025],
  [108.22759595199403, -7.345532358817067],
  [108.22760271546116, -7.3452362773231386],
  [108.22762501839793, -7.345186855336635],
  [108.22769727779934, -7.345081802405176],
  [108.22769727779934, -7.345081802405176],
  [108.22788558252068, -7.3448603459413135],
  [108.22794395409426, -7.3447401104112515],
  [108.22794540416828, -7.344741422720162],
  [108.22799554620542, -7.344538794328599],
  [108.22801870470067, -7.343687922471446],
  [108.22800920359163, -7.343459520167627],
  [108.22801372686757, -7.343385101920489],
  [108.22803047336697, -7.343311105494479],
  [108.22805376414942, -7.343231209517029],
  [108.22809279676056, -7.343164138222221],
  [108.22814990061141, -7.343089678107717],
  [108.22849307517191, -7.342704877316507],
  [108.22853807181895, -7.342618022682117],
  [108.22885122242741, -7.341634807064395],
  [108.22888186138067, -7.341572571371728],
  [108.2289147258848, -7.3415222080045766],
  [108.22948177519669, -7.34091753636929],
  [108.22951545864089, -7.3408672384506986],
  [108.22985386014369, -7.340072924025051],
  [108.2298715348769, -7.340007694163006],
  [108.2300096540489, -7.339713919440598],
  [108.23003374120049, -7.339673124301314],
  [108.23010275870365, -7.339575428691688],
  [108.23035405776233, -7.339155229504939],
  [108.23042696489875, -7.3390997910046565],
  [108.23050191204578, -7.339090952004938],
  [108.23057741593908, -7.3391040914522705],
  [108.23079194878318, -7.339168282903572],
  [108.23086280118451, -7.339179268437178],
  [108.23094562422978, -7.339167976615187],
  [108.23098895782675, -7.3391301311942385],
  [108.23101609253285, -7.339078790515998],
  [108.2312583152272, -7.338447608714517],
  [108.23135002757766, -7.338133237326545],
  [108.23142906567301, -7.337742145035577],
  [108.23152224914548, -7.337313598259314],
  [108.23167700464785, -7.336698417240569],
  [108.23167773666944, -7.336637650832387],
  [108.2316388636417, -7.336362407642653],
  [108.23162567991176, -7.335903995332373],
  [108.2316343336883, -7.335638311156018],
  [108.23170695081217, -7.334899755768689],
  [108.23171318598418, -7.333804552258982],
  [108.23174181050388, -7.333558322772205],
  [108.23173448961944, -7.3335238530299165],
  [108.23171850021521, -7.3334908360531585],
  [108.23166565333639, -7.333446762415974],
  [108.23155144085297, -7.333412332287551],
  [108.23137529151472, -7.333328971203656],
  [108.23134771846202, -7.333302238713387],
  [108.23133570357504, -7.333258909368311],
  [108.23132987360731, -7.333208374154054],
  [108.23132857001457, -7.333127604021968],
  [108.23137013507761, -7.332749486201237],
  [108.23139914554008, -7.332605420697519],
  [108.2314243394107, -7.3323885155771364],
  [108.23145009416538, -7.3321501607833],
  [108.23142163684741, -7.331805948214878],
  [108.23138312503193, -7.3316189270513235],
  [108.23130413571056, -7.331317450205802],
  [108.23126668300154, -7.331207229038554],
  [108.23123135023587, -7.331050458447137],
  [108.23122543116483, -7.330910467858629],
  [108.23132001797063, -7.330010195838923],
  [108.23131052779507, -7.329962063407663],
  [108.23128455360114, -7.32992717040851],
  [108.23124022495688, -7.329890323274142],
  [108.23117859613046, -7.329867065981404],
  [108.23090753579055, -7.329801681777255],
  [108.23080659927871, -7.329769089972018],
  [108.23059719001498, -7.3296664448777165],
  [108.23046779755634, -7.329626917882891],
  [108.23008163385765, -7.329565378664341],
  [108.2300227511862, -7.3295436809588494],
  [108.22997737718651, -7.32951571466738],
  [108.22992029666881, -7.329457356596734],
  [108.22987816897955, -7.329381478029646],
  [108.22984550999752, -7.329292868157253],
  [108.22960999064787, -7.328492966610341],
  [108.22955874947866, -7.328118790965149],
  [108.22884823180209, -7.327942788521739],
  [108.22718855911205, -7.327491525949014],
  [108.22472659356453, -7.326888231031958],
  [108.22079981162125, -7.32589286405414],
  [108.22089547702393, -7.325730666783258],
  [108.22109161264041, -7.324969327549454],
  [108.2214814399876, -7.323397311188629],
  [108.22157326570488, -7.322748909820149],
  [108.22147873874258, -7.32241717563879],
  [108.2211952394801, -7.3211545688672],
  [108.22099110221586, -7.3209407000266395],
  [108.22007736696474, -7.320202998362561],
  [108.21996792949665, -7.32015152003477],
  [108.21987779447647, -7.3202895107823025],
  [108.21985852914713, -7.3203386312730885],
  [108.21976443009254, -7.320743559258091],
  [108.21971269285638, -7.320839358333856],
  [108.21967298628181, -7.320867559539039],
  [108.21965026579358, -7.320868869925803],
  [108.21832859633622, -7.320722107359998],
  [108.21768230266946, -7.320634429292028],
  [108.21762999571581, -7.3207387705013645],
  [108.21754837944451, -7.320911954710937],
  [108.21750865713216, -7.321021556200165],
  [108.21748565128411, -7.321112547419986],
  [108.21745120081425, -7.321266361162898],
  [108.21736979525531, -7.321778770199245],
  [108.21734807696618, -7.321818043499334],
  [108.217315449718, -7.321848465184672],
  [108.21727704171138, -7.321866465580584],
  [108.2166090216561, -7.321881159107207],
  [108.2165317241292, -7.321879189010147],
  [108.21646568789868, -7.32188783331469],
  [108.2162437801912, -7.321946395930652],
  [108.21620264563012, -7.321961140922511],
  [108.21596979181095, -7.322070065650337],
  [108.21591905644539, -7.322081877568792],
  [108.21547970192069, -7.3221065842261766],
  [108.21549999817, -7.322247362949028],
  [108.21551565752048, -7.322472602971658],
  [108.21554175753352, -7.323056388511873],
  [108.21432627340818, -7.322745031873822],
  [108.21316307445488, -7.3227820899356715],
  [108.21225812955475, -7.322758449895929],
  [108.21170171482527, -7.322840701257306],
  [108.21101195365873, -7.322958950540908],
  [108.21073923002547, -7.323060524294149],
  [108.20822829467085, -7.3244997149073185],
  [108.2080447318719, -7.32456179604938],
  [108.20720372995225, -7.324686267891764],
  [108.20697189457962, -7.324702380699762],
  [108.20696494881491, -7.3247880208291605],
  [108.20697636325633, -7.324832545118738],
  [108.20701383049345, -7.324875771349937],
  [108.20707328111632, -7.3249059396897565],
  [108.20828225877426, -7.325361996957795],
  [108.20796581450503, -7.326232608259616],
  [108.20781617933682, -7.326516777210742],
  [108.20687508839512, -7.3283223846770085],
  [108.2068303785922, -7.328501344151135],
  [108.20670854026406, -7.329724783591502],
  [108.20669681174905, -7.3302677977519295],
  [108.20664200381606, -7.330575656558324],
  [108.20664271083155, -7.330576310618952],
  [108.20609635451416, -7.331975682328505],
  [108.2059231122281, -7.3325296155835815],
  [108.20553883307974, -7.334277582795181],
  [108.20546726964602, -7.334693113209468],
  [108.20523729719014, -7.335662681057116],
  [108.2049872087918, -7.337206001993039],
  [108.2047751440047, -7.3380979511873505],
  [108.20493769867744, -7.338747154884388],
  [108.20502792228854, -7.338959567953253],
  [108.20526223406324, -7.3396276978576935],
  [108.20532499864186, -7.339841119058406],
  [108.20540242675037, -7.339976645664777],
  [108.20542609277271, -7.340037482254388],
  [108.20530115502129, -7.340032119922554],
  [108.20505717133307, -7.340098393776714],
  [108.20480544182266, -7.340182808064441],
  [108.2042396535154, -7.340346809948414],
  [108.20350352530693, -7.340575464433385],
  [108.20291005849862, -7.3408037540464335],
  [108.20254100235854, -7.340970814814028],
  [108.20254263471844, -7.3410632017725135],
  [108.20253102407275, -7.341146146897501],
  [108.20249890992585, -7.341230935654522],
  [108.20237465230844, -7.341443257254241],
  [108.20232243362057, -7.341414385328505],
  [108.20238111618397, -7.341301461602413],
  [108.20241345477882, -7.3412321534893294],
  [108.20246562370403, -7.341030959912047],
  [108.20244428616343, -7.340973980274242],
  [108.20219953623746, -7.340240128318996],
  [108.20200547905097, -7.339539356713587],
  [108.20158875744795, -7.338286408101922],
  [108.20158861699201, -7.337750349181519],
  [108.20161524351192, -7.337176892841683],
  [108.20161623407779, -7.336809945665081],
  [108.20158965336736, -7.33660147500521],
  [108.2014974243163, -7.336143476427594],
  [108.20145388411396, -7.335688997892319],
  [108.20154068615591, -7.335682808090652],
];

module.exports = routeCoordinates;