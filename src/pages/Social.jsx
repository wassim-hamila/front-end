import { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import Spinner from '../components/common/Spinner';
import { Users, Activity, Award, TrendingUp, UserPlus } from 'lucide-react';
import userService from '../services/userService';
import { formatDate, formatDuration } from '../utils/helpers';

const Social = () => {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const data = await userService.getSocialFeed();
      setFeed(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  const hasContent = feed?.workouts?.length > 0 || feed?.achievements?.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Social</h1>
          <p className="text-gray-600 mt-2">Suivez vos amis et partagez vos progrès</p>
        </div>

        {!hasContent ? (
          <Card>
            <EmptyState
              icon={Users}
              title="Fonctionnalité en développement"
              description="Le feed social et les fonctionnalités de suivi d'utilisateurs seront bientôt disponibles ! En attendant, concentrez-vous sur vos propres objectifs."
              action={
                <div className="space-y-3">
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 max-w-md mx-auto">
                    <h3 className="font-semibold text-primary-900 mb-2">À venir prochainement :</h3>
                    <ul className="text-sm text-primary-800 space-y-1">
                      <li>✓ Suivre d'autres utilisateurs</li>
                      <li>✓ Partager vos entraînements</li>
                      <li>✓ Commenter et encourager</li>
                      <li>✓ Classements et défis</li>
                    </ul>
                  </div>
                </div>
              }
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feed principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Entraînements récents */}
              {feed.workouts?.length > 0 && (
                <Card title="Activités récentes">
                  <div className="space-y-4">
                    {feed.workouts.map((workout) => (
                      <div key={workout._id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Activity className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{workout.user?.name}</span> a complété un entraînement
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {workout.type} • {formatDuration(workout.duration)} • {workout.caloriesBurned} cal
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(workout.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Objectifs complétés */}
              {feed.achievements?.length > 0 && (
                <Card title="Objectifs atteints 🏆">
                  <div className="space-y-4">
                    {feed.achievements.map((goal) => (
                      <div key={goal._id} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{goal.user?.name}</span> a atteint son objectif !
                          </p>
                          <p className="text-sm text-gray-700 mt-1 font-medium">
                            {goal.type} : {goal.targetValue}
                          </p>
                          {goal.description && (
                            <p className="text-xs text-gray-600 mt-1">{goal.description}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{formatDate(goal.updatedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card title="Suggestions">
                <EmptyState
                  icon={UserPlus}
                  title="Aucune suggestion"
                  description="Les suggestions d'utilisateurs à suivre apparaîtront ici"
                />
              </Card>

              <Card title="Classement">
                <EmptyState
                  icon={TrendingUp}
                  title="Classement à venir"
                  description="Comparez vos performances avec la communauté"
                />
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;