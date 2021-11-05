import {Button, Div, PanelHeader, Root, View, Panel} from "@vkontakte/vkui";
import {useEffect, useRef, useState} from "react";
import bridge from "@vkontakte/vk-bridge";
import MainPanel from "./MainPanel";
import QrPanel from "./QrPanel";
import ListPanel from "./ListPanel";

function App() {
    const [activeView, setActiveView] = useState('main');
    return <Root activeView={activeView}>
        <View activePanel={'mainPanel'} id={'main'}>
            <Panel id={'mainPanel'}>
                <MainPanel onList={() => setActiveView('list')} onQr={() => setActiveView('qr')} />
            </Panel>
        </View>
        <View activePanel={'qrPanel'} id={'qr'}>
            <Panel id={'qrPanel'}>
                <QrPanel onMain={() => setActiveView('main')} />
            </Panel>
        </View>
        <View activePanel={'listPanel'} id={'list'}>
            <Panel id={'listPanel'}>
                <ListPanel onMain={() => setActiveView('main')} />
            </Panel>
        </View>
    </Root>
}

export default App;
