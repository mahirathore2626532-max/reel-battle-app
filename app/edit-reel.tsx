import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const categories = ['Dance', 'Music', 'Comedy', 'Lifestyle', 'Trending'];
const visibilityOptions = ['Public', 'Followers', 'Private'];

export default function EditReelScreen() {
  const [title, setTitle] = useState('Epic Dance Battle');
  const [caption, setCaption] = useState(
    'High energy performance with smooth transitions and perfect beat sync 🔥'
  );
  const [selectedCategory, setSelectedCategory] = useState('Dance');
  const [selectedVisibility, setSelectedVisibility] = useState('Public');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#081018" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Reel</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="checkmark-outline" size={22} color="#22C55E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.previewCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
            }}
            style={styles.previewImage}
          />

          <View style={styles.previewOverlay}>
            <View style={styles.playBtn}>
              <Ionicons name="play" size={24} color="#fff" />
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Reel Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter reel title"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Caption</Text>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Write a caption"
            placeholderTextColor="#94A3B8"
            style={[styles.input, styles.textArea]}
            multiline
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.chipWrap}>
            {categories.map((item) => {
              const active = selectedCategory === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Visibility</Text>
          <View style={styles.visibilityRow}>
            {visibilityOptions.map((item) => {
              const active = selectedVisibility === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.visibilityBtn, active && styles.visibilityBtnActive]}
                  onPress={() => setSelectedVisibility(item)}
                >
                  <Text
                    style={[
                      styles.visibilityBtnText,
                      active && styles.visibilityBtnTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.toolsCard}>
          <Text style={styles.sectionTitle}>Quick Tools</Text>

          <TouchableOpacity style={styles.toolRow}>
            <View style={styles.toolLeft}>
              <View style={styles.toolIconWrap}>
                <Ionicons name="image-outline" size={20} color="#8B5CF6" />
              </View>
              <Text style={styles.toolTitle}>Change Thumbnail</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolRow}>
            <View style={styles.toolLeft}>
              <View style={styles.toolIconWrap}>
                <Ionicons name="musical-notes-outline" size={20} color="#8B5CF6" />
              </View>
              <Text style={styles.toolTitle}>Edit Music</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolRow}>
            <View style={styles.toolLeft}>
              <View style={styles.toolIconWrap}>
                <Ionicons name="pricetag-outline" size={20} color="#8B5CF6" />
              </View>
              <Text style={styles.toolTitle}>Add Hashtags</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Reel Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#081018' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#111C2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  previewCard: {
    marginTop: 8,
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#111C2B',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  playBtn: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,
    color: '#fff',
    fontSize: 14,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  chipActive: {
    backgroundColor: '#8B5CF6',
  },
  chipText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#fff',
  },
  visibilityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  visibilityBtn: {
    flex: 1,
    backgroundColor: '#1F2937',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  visibilityBtnActive: {
    backgroundColor: '#FACC15',
  },
  visibilityBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  visibilityBtnTextActive: {
    color: '#111827',
  },
  toolsCard: {
    marginTop: 16,
    backgroundColor: '#111C2B',
    borderRadius: 22,
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
  },
  toolRow: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  toolLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(139,92,246,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  toolTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  saveBtn: {
    marginTop: 18,
    backgroundColor: '#8B5CF6',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
});