import type {
  BehaviourOptions,
  ContextOptions,
  ErrorOptions,
  RenderOptions,
} from "../types.js";

export interface ODataQueryable {
  expand?: string[];
  select?: string[];
}

export interface ODataQueryableCollection extends ODataQueryable {
  top?: number;
  orderBy?: string;
  orderyByAscending?: boolean;
  skip?: number;
  filter?: string;
}

export interface FilteredODataQueryable extends ODataQueryable {
  filter?: string;
}

export interface Scope {
  /** List GUID Id or title */
  list: string;

  /** Item Id */
  item?: number;
}

export interface PnpHookOptions<
  T = null | undefined | ODataQueryableCollection | ODataQueryable,
> extends ErrorOptions,
    RenderOptions,
    ContextOptions,
    BehaviourOptions {
  query?: T | undefined | null;
}

/**
 * https://docs.microsoft.com/en-us/dotnet/api/microsoft.sharepoint.client.renderlistdataoverrideparameters?view=sharepoint-csom
 */
export interface RenderListDataOverrideParameters
  extends Record<string, string | undefined> {
  CascDelWarnMessage?: string;
  CustomAction?: string;
  DrillDown?: string;
  Field?: string;
  FieldInternalName?: string;
  Filter?: string;
  FilterData?: string;
  FilterData1?: string;
  FilterData10?: string;
  FilterData2?: string;
  FilterData3?: string;
  FilterData4?: string;
  FilterData5?: string;
  FilterData6?: string;
  FilterData7?: string;
  FilterData8?: string;
  FilterData9?: string;
  FilterField?: string;
  FilterField1?: string;
  FilterField10?: string;
  FilterField2?: string;
  FilterField3?: string;
  FilterField4?: string;
  FilterField5?: string;
  FilterField6?: string;
  FilterField7?: string;
  FilterField8?: string;
  FilterField9?: string;
  FilterFields?: string;
  FilterFields1?: string;
  FilterFields10?: string;
  FilterFields2?: string;
  FilterFields3?: string;
  FilterFields4?: string;
  FilterFields5?: string;
  FilterFields6?: string;
  FilterFields7?: string;
  FilterFields8?: string;
  FilterFields9?: string;
  FilterLookupId?: string;
  FilterLookupId1?: string;
  FilterLookupId10?: string;
  FilterLookupId2?: string;
  FilterLookupId3?: string;
  FilterLookupId4?: string;
  FilterLookupId5?: string;
  FilterLookupId6?: string;
  FilterLookupId7?: string;
  FilterLookupId8?: string;
  FilterLookupId9?: string;
  FilterOp?: string;
  FilterOp1?: string;
  FilterOp10?: string;
  FilterOp2?: string;
  FilterOp3?: string;
  FilterOp4?: string;
  FilterOp5?: string;
  FilterOp6?: string;
  FilterOp7?: string;
  FilterOp8?: string;
  FilterOp9?: string;
  FilterValue?: string;
  FilterValue1?: string;
  FilterValue10?: string;
  FilterValue2?: string;
  FilterValue3?: string;
  FilterValue4?: string;
  FilterValue5?: string;
  FilterValue6?: string;
  FilterValue7?: string;
  FilterValue8?: string;
  FilterValue9?: string;
  FilterValues?: string;
  FilterValues1?: string;
  FilterValues10?: string;
  FilterValues2?: string;
  FilterValues3?: string;
  FilterValues4?: string;
  FilterValues5?: string;
  FilterValues6?: string;
  FilterValues7?: string;
  FilterValues8?: string;
  FilterValues9?: string;
  GroupString?: string;
  HasOverrideSelectCommand?: string;
  ID?: string;
  InplaceFullListSearch?: string;
  InplaceSearchQuery?: string;
  IsCSR?: string;
  IsGroupRender?: string;
  IsXslView?: string;
  ListViewPageUrl?: string;
  OverrideScope?: string;
  OverrideSelectCommand?: string;
  PageFirstRow?: string;
  PageLastRow?: string;
  RootFolder?: string;
  SortDir?: string;
  SortDir1?: string;
  SortDir10?: string;
  SortDir2?: string;
  SortDir3?: string;
  SortDir4?: string;
  SortDir5?: string;
  SortDir6?: string;
  SortDir7?: string;
  SortDir8?: string;
  SortDir9?: string;
  SortField?: string;
  SortField1?: string;
  SortField10?: string;
  SortField2?: string;
  SortField3?: string;
  SortField4?: string;
  SortField5?: string;
  SortField6?: string;
  SortField7?: string;
  SortField8?: string;
  SortField9?: string;
  SortFields?: string;
  SortFieldValues?: string;
  TypeId?: string;
  View?: string;
  ViewCount?: string;
  ViewId?: string;
  ViewPath?: string;
  WebPartId?: string;
}
