
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SuccessStory {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  is_published: boolean;
  created_at: string;
}

const SuccessStories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'reunion'
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching success stories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch success stories.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingStory) {
        const { error } = await supabase
          .from('success_stories')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingStory.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Success story updated successfully!"
        });
      } else {
        const { error } = await supabase
          .from('success_stories')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Success story created successfully!"
        });
      }

      setFormData({ title: '', description: '', content: '', category: 'reunion' });
      setShowForm(false);
      setEditingStory(null);
      fetchStories();
    } catch (error) {
      console.error('Error saving success story:', error);
      toast({
        title: "Error",
        description: "Failed to save success story.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublish = async (story: SuccessStory) => {
    try {
      const { error } = await supabase
        .from('success_stories')
        .update({ is_published: !story.is_published })
        .eq('id', story.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Story ${!story.is_published ? 'published' : 'unpublished'} successfully!`
      });
      
      fetchStories();
    } catch (error) {
      console.error('Error toggling publish status:', error);
      toast({
        title: "Error",
        description: "Failed to update publish status.",
        variant: "destructive"
      });
    }
  };

  const deleteStory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      const { error } = await supabase
        .from('success_stories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Story deleted successfully!"
      });
      
      fetchStories();
    } catch (error) {
      console.error('Error deleting story:', error);
      toast({
        title: "Error",
        description: "Failed to delete story.",
        variant: "destructive"
      });
    }
  };

  const startEdit = (story: SuccessStory) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      description: story.description,
      content: story.content,
      category: story.category
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingStory(null);
    setFormData({ title: '', description: '', content: '', category: 'reunion' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">The Broken Weave</h1>
                <p className="text-sm text-gray-600">Success Stories Management</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Story
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingStory ? 'Edit Story' : 'Create New Success Story'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="reunion">Reunion</option>
                    <option value="rescue">Rescue</option>
                    <option value="support">Support</option>
                    <option value="recovery">Recovery</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {editingStory ? 'Update Story' : 'Create Story'}
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    <CardDescription className="capitalize">{story.category}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(story)}
                    >
                      {story.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(story)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteStory(story.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {story.description && (
                  <p className="text-sm text-gray-600 mb-3">{story.description}</p>
                )}
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{story.content}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Status: {story.is_published ? 'Published' : 'Draft'}</span>
                  <span>{new Date(story.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {stories.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No success stories found. Create your first story!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuccessStories;
