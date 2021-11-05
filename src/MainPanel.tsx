import React, {useCallback, useEffect, useState} from 'react';
import {Panel, PanelHeader, CellButton} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

interface Props {
  onQr: () => void;
  onList: () => void;
}

const MainPanel: React.FunctionComponent<Props> = ({onList, onQr}) => {
  const [codesCount, setCodesCount] = useState(0);
  const [err, setErr] = useState('');
  useEffect(() => {
    bridge.send('VKWebAppStorageGetKeys', {count: 999, offset: 0}).then(value => setCodesCount(value.keys.length));
  }, []);
  const onHistoryShare = useCallback(() => {
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'none',
      attachment: {
        text: 'QR Reader',
        type: 'url',
        url: 'https://vk.com/app7993533'
      },
      locked: false,
      url: '',
      stickers: [
        {
          sticker_type: 'renderable',
          sticker: {
            content_type: 'image',
            url: 'https://i.imgur.com/qd7oDwd.png',
            original_width: 256,
            original_height: 256,
            can_delete: false,
            clickable_zones: [
              {
                action_type: 'link',
                action: {
                  sticker_id: 1,
                  link: 'https://vk.com/app7993533',
                  tooltip_text_key: 'tooltip_open_default',
                },
                clickable_area: [
                  {x: 0, y: 0},
                  {x: 256, y: 0},
                  {x: 256, y: 256},
                  {x: 0, y: 256},
                ]
              }
            ]
          }
        }
      ]
    }).catch(reason => setErr(JSON.stringify(reason)));
  }, []);
  return (
    <Panel id={'mainPanel'}>
      <PanelHeader>Главная</PanelHeader>
      <div className={'main'}>
        <h3>Кол-во кодов: {codesCount}</h3>
        <CellButton onClick={onQr}>Отсканировать QR код</CellButton>
        <CellButton onClick={onList}>Перейти к списку</CellButton>
        <CellButton onClick={onHistoryShare}>Зашарить в истории</CellButton>
        {err && <p>{err}</p>}
      </div>
    </Panel>
  );
};

export default MainPanel;
