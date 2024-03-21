<script setup lang="ts">
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
</script>

<template>
  <SelectTrigger>
    <SelectValue placeholder="Select a region" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="es:ar">
        Argentina
      </SelectItem>
      <SelectItem value="en:au">
        Australia
      </SelectItem>
      <SelectItem value="de:at">
        Austria (Österreich)
      </SelectItem>
      <SelectItem value="fr:be">
        Belgium (Français)
      </SelectItem>
      <SelectItem value="nl:be">
        Belgium (Nederlands)
      </SelectItem>
      <SelectItem value="pt:br">
        Brasil
      </SelectItem>
      <SelectItem value="bg:bg">
        Bulgaria (България)
      </SelectItem>
      <SelectItem value="en:ca">
        Canada
      </SelectItem>
      <SelectItem value="fr:ca">
        Canada (French)
      </SelectItem>
      <SelectItem value="es:cl">
        Chile
      </SelectItem>
      <SelectItem value="es:co">
        Colombia
      </SelectItem>
      <SelectItem value="es:cr">
        Costa Rica
      </SelectItem>
      <SelectItem value="hr:hr">
        Croatia (Hrvatska)
      </SelectItem>
      <SelectItem value="en:cy">
        Cyprus
      </SelectItem>
      <SelectItem value="cs:cz">
        Czech Republic (Ceská Republika)
      </SelectItem>
      <SelectItem value="da:dk">
        Denmark (Danmark)
      </SelectItem>
      <SelectItem value="es:ec">
        Ecuador
      </SelectItem>
      <SelectItem value="es:sv">
        El Salvador
      </SelectItem>
      <SelectItem value="fi:fi">
        Finland (Suomi)
      </SelectItem>
      <SelectItem value="de:de">
        Germany (Deutschland)
      </SelectItem>
      <SelectItem value="el:gr">
        Greece (Ελλαδα)
      </SelectItem>
      <SelectItem value="es:gt">
        Guatemala
      </SelectItem>
      <SelectItem value="es:hn">
        Honduras
      </SelectItem>
      <SelectItem value="hu:hu">
        Hungary (Magyarország)
      </SelectItem>
      <SelectItem value="is:is">
        Iceland (Ísland)
      </SelectItem>
      <SelectItem value="en:in">
        India
      </SelectItem>
      <SelectItem value="en:ie">
        Ireland
      </SelectItem>
      <SelectItem value="it:it">
        Italy
      </SelectItem>
      <SelectItem value="de:lu">
        Luxembourg (Deutsch)
      </SelectItem>
      <SelectItem value="fr:lu">
        Luxembourg (Français)
      </SelectItem>
      <SelectItem value="en:mt">
        Malta
      </SelectItem>
      <SelectItem value="es:mx">
        Mexico (México)
      </SelectItem>
      <SelectItem value="nl:nl">
        Nederland
      </SelectItem>
      <SelectItem value="en:nz">
        New Zealand
      </SelectItem>
      <SelectItem value="es:ni">
        Nicaragua
      </SelectItem>
      <SelectItem value="no:no">
        Norway (Norge)
      </SelectItem>
      <SelectItem value="es:pa">
        Panama (Panamá)
      </SelectItem>
      <SelectItem value="es:py">
        Paraguay
      </SelectItem>
      <SelectItem value="es:pe">
        Peru (Perú)
      </SelectItem>
      <SelectItem value="pl:pl">
        Poland (Polska)
      </SelectItem>
      <SelectItem value="pt:pt">
        Portugal
      </SelectItem>
      <SelectItem value="ro:ro">
        Romania (România)
      </SelectItem>
      <SelectItem value="ru:ru">
        Russia (Россия)
      </SelectItem>
      <SelectItem value="ar:sa">
        Saudi Arabia (Arabic)
      </SelectItem>
      <SelectItem value="sl:si">
        Slovenia (Slovenija)
      </SelectItem>
      <SelectItem value="sk:sk">
        Slovakia (Slovenská Republika)
      </SelectItem>
      <SelectItem value="en:za">
        South Africa
      </SelectItem>
      <SelectItem value="es:es">
        Spain (España)
      </SelectItem>
      <SelectItem value="sv:se">
        Sweden (Sverige)
      </SelectItem>
      <SelectItem value="de:ch">
        Switzerland (Deutsch)
      </SelectItem>
      <SelectItem value="fr:ch">
        Switzerland (Français)
      </SelectItem>
      <SelectItem value="it:ch">
        Switzerland (Italiano)
      </SelectItem>
      <SelectItem value="tr:tr">
        Turkey (Türkiye)
      </SelectItem>
      <SelectItem value="uk:ua">
        Ukraine (Україна)
      </SelectItem>
      <SelectItem value="en:ae">
        United Arab Emirates / Middle East
      </SelectItem>
      <SelectItem value="en:us">
        United States
      </SelectItem>
      <SelectItem value="en:gb">
        United Kingdom
      </SelectItem>
      <SelectItem value="es:uy">
        Uruguay
      </SelectItem>
    </SelectGroup>
  </SelectContent>
</template>
