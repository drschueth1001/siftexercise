import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, BookOpen } from 'lucide-react';

export default function SIFTExercise() {
  const [currentSite, setCurrentSite] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [completedSites, setCompletedSites] = useState(new Set());

  const websites = [
    {
      id: 1,
      name: "Pacific Research Institute",
      url: "www.pacificresearch.org",
      description: "A website publishing articles about health policy and economics",
      questions: [
        {
          id: "q1",
          question: "What type of organization is the Pacific Research Institute?",
          options: [
            "A government health agency",
            "A free-market think tank",
            "An academic research university",
            "A non-partisan fact-checking organization"
          ],
          correct: 1,
          explanation: "The Pacific Research Institute is a free-market oriented think tank. This means it has a specific ideological perspective that shapes its research and recommendations. While it may produce valuable research, understanding its ideological stance is crucial for evaluating its claims."
        },
        {
          id: "q2",
          question: "When using this source, you should:",
          options: [
            "Trust it completely because it sounds official",
            "Reject everything because it has bias",
            "Recognize its perspective and seek additional viewpoints",
            "Only use it for medical advice"
          ],
          correct: 2,
          explanation: "All sources have some perspective or bias. The key is to recognize it and balance your research with multiple viewpoints. Think tanks can provide valuable analysis, but should be balanced with other sources representing different perspectives."
        }
      ]
    },
    {
      id: 2,
      name: "MinnPost",
      url: "www.minnpost.com",
      description: "A news website covering Minnesota politics and culture",
      questions: [
        {
          id: "q1",
          question: "MinnPost is best described as:",
          options: [
            "A traditional newspaper owned by a large media corporation",
            "A nonprofit, nonpartisan news organization",
            "A government-run news service",
            "A blog run by political activists"
          ],
          correct: 1,
          explanation: "MinnPost is a nonprofit news organization founded in 2007 that focuses on Minnesota news. It operates on a nonprofit model with member support and foundation funding, which is different from traditional ad-based or corporate-owned media."
        },
        {
          id: "q2",
          question: "For local Minnesota news, MinnPost would be:",
          options: [
            "Unreliable because it's online-only",
            "A credible source worth considering",
            "Only useful for entertainment news",
            "Impossible to verify"
          ],
          correct: 1,
          explanation: "MinnPost has established itself as a credible source for Minnesota news, with professional journalists and editorial standards. Being online-only doesn't make a source less reliable - many respected news organizations operate digitally."
        }
      ]
    },
    {
      id: 3,
      name: "Natural News",
      url: "www.naturalnews.com",
      description: "A website featuring health and wellness articles",
      questions: [
        {
          id: "q1",
          question: "According to media literacy experts, Natural News is:",
          options: [
            "A peer-reviewed medical journal",
            "A reliable health information source",
            "Known for promoting conspiracy theories and pseudoscience",
            "Run by certified medical professionals"
          ],
          correct: 2,
          explanation: "Natural News has been widely criticized for promoting conspiracy theories, pseudoscience, and health misinformation. It has been flagged by fact-checkers and media literacy experts as an unreliable source for health information."
        },
        {
          id: "q2",
          question: "If you see a health claim from Natural News, you should:",
          options: [
            "Share it immediately because natural health is important",
            "Verify the claim with medical authorities like CDC or Mayo Clinic",
            "Assume it's true because it's on the internet",
            "Only question it if it sounds extreme"
          ],
          correct: 1,
          explanation: "Always verify health claims with established medical authorities, peer-reviewed research, or trusted health organizations. Sites like the CDC, Mayo Clinic, or peer-reviewed medical journals provide evidence-based information."
        }
      ]
    },
    {
      id: 4,
      name: "American College of Pediatricians",
      url: "www.acpeds.org",
      description: "An organization that appears to represent pediatric doctors",
      questions: [
        {
          id: "q1",
          question: "The American College of Pediatricians is:",
          options: [
            "The main professional organization for pediatricians",
            "A small socially conservative advocacy group",
            "A government health agency",
            "The same as the American Academy of Pediatrics"
          ],
          correct: 1,
          explanation: "The American College of Pediatricians (ACPeds) is a small socially conservative advocacy group, NOT the main professional organization. The American Academy of Pediatrics (AAP) with 67,000 members is the legitimate professional organization. ACPeds has only a few hundred members."
        },
        {
          id: "q2",
          question: "This organization's name is an example of:",
          options: [
            "Standard medical naming conventions",
            "A misleading name designed to appear more authoritative",
            "Proper professional credentialing",
            "Government-approved terminology"
          ],
          correct: 1,
          explanation: "This is a classic example of a misleading name. The similar-sounding name to the legitimate American Academy of Pediatrics appears designed to lend false authority. Always investigate organizations carefully, even when they have official-sounding names."
        }
      ]
    },
    {
      id: 5,
      name: "ProPublica",
      url: "www.propublica.org",
      description: "An investigative journalism organization",
      questions: [
        {
          id: "q1",
          question: "ProPublica is:",
          options: [
            "A tabloid news site",
            "A nonprofit investigative journalism organization",
            "A political campaign website",
            "A social media platform"
          ],
          correct: 1,
          explanation: "ProPublica is an independent, nonprofit newsroom that produces investigative journalism in the public interest. It has won multiple Pulitzer Prizes and is widely respected for its in-depth reporting."
        },
        {
          id: "q2",
          question: "ProPublica's work is considered:",
          options: [
            "Entertainment content only",
            "Unreliable because it's nonprofit",
            "High-quality investigative journalism",
            "Biased propaganda"
          ],
          correct: 2,
          explanation: "ProPublica is widely recognized as a high-quality source of investigative journalism. Being nonprofit doesn't make it less reliable - in fact, it means it's not driven by corporate profits or advertiser interests. ProPublica has won multiple Pulitzer Prizes for its reporting."
        }
      ]
    }
  ];

  const handleAnswer = (siteIndex, questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [`${siteIndex}-${questionId}`]: answerIndex
    });
    setShowFeedback({
      ...showFeedback,
      [`${siteIndex}-${questionId}`]: true
    });
  };

  const checkSiteComplete = (siteIndex) => {
    const site = websites[siteIndex];
    return site.questions.every(q => answers[`${siteIndex}-${q.id}`] !== undefined);
  };

  const getSiteScore = (siteIndex) => {
    const site = websites[siteIndex];
    let correct = 0;
    site.questions.forEach(q => {
      if (answers[`${siteIndex}-${q.id}`] === q.correct) correct++;
    });
    return { correct, total: site.questions.length };
  };

  const currentWebsite = websites[currentSite];
  const siteComplete = checkSiteComplete(currentSite);
  const { correct, total } = getSiteScore(currentSite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">SIFT Method: Website Validity Exercise</h1>
          </div>
          <p className="text-gray-600">
            Based on Mike Caulfield's Four Moves for evaluating online information
          </p>
          
          {/* Progress */}
          <div className="mt-4 flex gap-2">
            {websites.map((site, idx) => (
              <button
                key={site.id}
                onClick={() => setCurrentSite(idx)}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  checkSiteComplete(idx) 
                    ? 'bg-green-500' 
                    : idx === currentSite 
                    ? 'bg-indigo-500' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Website Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Website {currentSite + 1} of {websites.length}: {currentWebsite.name}
              </h2>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <ExternalLink className="w-4 h-4" />
                <span className="font-mono text-sm">{currentWebsite.url}</span>
              </div>
              <p className="text-gray-600">{currentWebsite.description}</p>
            </div>
          </div>

          {/* Wikipedia Trick Reminder */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900">Try the Wikipedia Trick:</p>
                <p className="text-sm text-blue-800">Search: <span className="font-mono bg-white px-2 py-0.5 rounded">{currentWebsite.url} wikipedia</span></p>
              </div>
            </div>
          </div>

          {/* Questions */}
          {currentWebsite.questions.map((question, qIdx) => (
            <div key={question.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">
                Question {qIdx + 1}: {question.question}
              </h3>
              
              <div className="space-y-2">
                {question.options.map((option, optIdx) => {
                  const answerKey = `${currentSite}-${question.id}`;
                  const isSelected = answers[answerKey] === optIdx;
                  const isCorrect = optIdx === question.correct;
                  const showResult = showFeedback[answerKey];

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(currentSite, question.id, optIdx)}
                      disabled={showResult}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        !showResult
                          ? 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                          : isSelected && isCorrect
                          ? 'border-green-500 bg-green-50'
                          : isSelected && !isCorrect
                          ? 'border-red-500 bg-red-50'
                          : isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={showResult && isCorrect ? 'font-semibold' : ''}>
                          {option}
                        </span>
                        {showResult && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showFeedback[`${currentSite}-${question.id}`] && (
                <div className="mt-3 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded">
                  <p className="text-sm text-indigo-900">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Score and Navigation */}
          {siteComplete && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`font-bold text-lg ${correct === total ? 'text-green-600' : 'text-indigo-600'}`}>
                    Score: {correct} / {total}
                  </div>
                  {correct === total && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                
                <div className="flex gap-2">
                  {currentSite > 0 && (
                    <button
                      onClick={() => setCurrentSite(currentSite - 1)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {currentSite < websites.length - 1 && (
                    <button
                      onClick={() => setCurrentSite(currentSite + 1)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Next Website
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SIFT Method Reference */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">SIFT Method Quick Reference</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-1">STOP</h4>
              <p className="text-sm text-red-800">Don't immediately read or share</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1">INVESTIGATE the source</h4>
              <p className="text-sm text-blue-800">Who's behind it? Use Wikipedia trick</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">FIND better coverage</h4>
              <p className="text-sm text-green-800">Check trusted sources for same story</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-1">TRACE to original</h4>
              <p className="text-sm text-purple-800">Find the original context</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}