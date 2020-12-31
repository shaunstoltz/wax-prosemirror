import { emDash, ellipsis } from 'prosemirror-inputrules';
import { columnResizing, tableEditing } from 'prosemirror-tables';
import {
  AnnotationToolGroupService,
  ImageService,
  PlaceholderService,
  InlineAnnotationsService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  ImageToolGroupService,
  TextBlockLevelService,
  TextToolGroupService,
  NoteService,
  NoteToolGroupService,
  TrackChangeService,
  CommentsService,
  CodeBlockService,
  CodeBlockToolGroupService,
  TrackChangeToolGroupService,
  DisplayTextToolGroupService,
  MathService,
  FindAndReplaceService,
  TrackingAndEditingToolGroupService,
  FullScreenService,
  FullScreenToolGroupService,
  SpecialCharactersService,
  SpecialCharactersToolGroupService,
  HighlightService,
  TextHighlightToolGroupServices,
  EditorInfoToolGroupServices,
  ShortcutToolGroupServices,
  HelpToolGroupServices,
  CounterInfoService,
  BottomInfoService,
  TransformService,
  TransformToolGroupService,
} from 'wax-prosemirror-services';

import { DefaultSchema } from 'wax-prosemirror-utilities';

import { WaxSelectionPlugin } from 'wax-prosemirror-plugins';

import invisibles, {
  space,
  hardBreak,
  paragraph,
} from '@guardian/prosemirror-invisibles';

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          more: ['Superscript', 'Subscript', 'SmallCaps'],
        },
        'HighlightToolGroup',
        'TransformToolGroup',
        'Notes',
        'Lists',
        'Images',
        'SpecialCharacters',
        'CodeBlock',
        'Tables',
        'TrackingAndEditing',
        'FullScreen',
      ],
    },
    {
      templateArea: 'leftSideBar',
      toolGroups: ['DisplayText'],
    },
    {
      templateArea: 'commentTrackToolBar',
      toolGroups: [
        {
          name: 'Annotations',
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
            'Emphasis',
            'Code',
            'Underline',
            'StrikeThrough',
          ],
        },
      ],
    },
    {
      templateArea: 'BottomRightInfo',
      toolGroups: [
        {
          name: 'InfoToolGroup',
          more: [
            'CounterInfoTool',
            'ShortcutTool',
            'HelpTool'
          ],
        },
      ],
    },
  ],

  SchemaService: DefaultSchema,

  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  EnableTrackChangeService: { enabled: false },
  TitleService: 'update',
  PmPlugins: [
    columnResizing(),
    tableEditing(),
    invisibles([hardBreak()]),
    WaxSelectionPlugin,
  ],

  // Always load first CommentsService and LinkService,
  //as it matters on how PM treats nodes and marks
  services: [
    new DisplayBlockLevelService(),
    new DisplayToolGroupService(),
    new TextBlockLevelService(),
    new TextToolGroupService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new TrackChangeService(),
    new CommentsService(),
    new PlaceholderService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new NoteService(),
    new TableToolGroupService(),
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new NoteToolGroupService(),
    new ListToolGroupService(),
    new CodeBlockService(),
    new CodeBlockToolGroupService(),
    new TrackChangeToolGroupService(),
    new DisplayTextToolGroupService(),
    new MathService(),
    new FindAndReplaceService(),
    new TrackingAndEditingToolGroupService(),
    new FullScreenService(),
    new FullScreenToolGroupService(),
    new SpecialCharactersService(),
    new SpecialCharactersToolGroupService(),
    new HighlightService(),
    new TextHighlightToolGroupServices(),
    new EditorInfoToolGroupServices(),
    new CounterInfoService(),
    new BottomInfoService(),
    new ShortcutToolGroupServices(),
    new HelpToolGroupServices(),
    new TransformService(),
    new TransformToolGroupService(),
  ],
};
