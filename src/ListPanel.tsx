import React, {useEffect, useState} from 'react';
import {Cell, Checkbox, Group, List, Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

interface Props {
  onMain: () => void;
}

function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

const ListPanel: React.FunctionComponent<Props> = ({onMain}) => {
  const [items, setItems] = useState<{key: string; value: string}[]>([]);
  const [onlyUrl, setOnlyUrl] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    bridge.send('VKWebAppStorageGetKeys', {count: 999, offset: 0})
      .then(value => bridge.send('VKWebAppStorageGet', {keys: value.keys}))
      .then(value => setItems(value.keys))
      .catch(reason => setError(JSON.stringify(reason)))
  }, []);
  return (
    <Panel>
      <PanelHeader left={<PanelHeaderBack onClick={onMain}/>}>Список результатов</PanelHeader>
      <Checkbox onChange={event => setOnlyUrl(event.target.checked)}>Только URL</Checkbox>
      <div className={'main overflow'}>
        <Group>
          {error ? <h3>Ошибка: {error}</h3> : (
            <List>
              {items.filter(value => !onlyUrl || isUrl(value.value)).map(value => (
                <Cell key={value.key} href={isUrl(value.value) ? value.value : undefined}>{value.value}</Cell>
              ))}
            </List>
          )}
        </Group>
      </div>
    </Panel>
  );
};

export default ListPanel;
