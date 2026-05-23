import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WinterplaceProject from './projects/WinterplaceProject'
import ProgrammaticCutoverProject from './projects/ProgrammaticCutoverProject'
import PublisherTrendProject from './projects/PublisherTrendProject'
import PfMasterProject from './projects/PfMasterProject'
import GleanPlannerProject from './projects/GleanPlannerProject'
import AiRewriterProject from './projects/AiRewriterProject'
import MediaOpsRetroProject from './projects/MediaOpsRetroProject'
import CpaLineupProject from './projects/CpaLineupProject'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/winterplace" element={<WinterplaceProject />} />
        <Route path="/projects/programmatic-cutover" element={<ProgrammaticCutoverProject />} />
        <Route path="/projects/publisher-trend-analysis" element={<PublisherTrendProject />} />
        <Route path="/projects/pf-master" element={<PfMasterProject />} />
        <Route path="/projects/glean-planner" element={<GleanPlannerProject />} />
        <Route path="/projects/ai-rewriter" element={<AiRewriterProject />} />
        <Route path="/projects/media-ops-retro" element={<MediaOpsRetroProject />} />
        <Route path="/projects/cpa-lineup" element={<CpaLineupProject />} />
      </Routes>
    </BrowserRouter>
  )
}
